const Game = require('./classes/Game');
const fs = require('fs');
const path = require('path');

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
			//res.writeHead(200, { 'Content-type': 'application/json' });
			//res.end(allGames);
			res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
			res.render('memoji_game.html', game);
		});

	});
}

module.exports = game;