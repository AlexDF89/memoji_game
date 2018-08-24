const Game = require('./classes/Game');
const fs = require('fs');
const path = require('path');
const request = require('request');

function game(req, res, lib) {

		let body = '';

		req.setEncoding('utf-8');
		req.on('data', data => body += data);
		req.on('end', () => {
			const data = lib.parseBody(body);
			const game = new Game(data);

			fs.readFile(path.join(__dirname, '../allGames.json'), 'utf-8', (err, data) => {
				if (err) {
					res.writeHead(500, { 'Content-type': 'text/plain' });
					res.end('Ошибка на сервере');
				}
				let allGames = JSON.parse(data);

				allGames[game.gameID] = game;
				allGames = JSON.stringify(allGames);

				fs.writeFile(path.join(__dirname, '../allGames.json'), allGames, error => {
					res.writeHead(500, { 'Content-type': 'text/plain' });
					res.end('Ошибка на сервере');				
				});

				request.post(
					'http://localhost:3000/compareCards',
					{ json: allGames },
					(err, response, body) => {}
				);

				game.cards = lib.createField(game.playingCards);
				game.time = lib.createTimer(game.timeOfGame);

				res.render('memoji_game.html', game);
			});

		});
}

module.exports = game;