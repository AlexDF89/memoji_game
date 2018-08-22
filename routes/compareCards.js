const fs = require('fs');
const path = require('path');

function compareCards (req, res, lib) {
	let data = '';
	req.on('data', part => data += part);
	req.on('end', () => {
		fs.readFile(path.join(__dirname, '../allGames.json'), 'utf-8', (err, file) => {
			if (err) {
				res.writeHead(500, { 'Content-type': 'text/plain' });
				res.end('Ошибка на сервере');
			}

			let allGames = JSON.parse(file);

			data = JSON.parse(data);
			const gameID = data[1];
			const positionCard = data[0];


			const game = allGames[gameID];
			const openedCards = [];

			game.playingCards.forEach((elem, i) => {
				if (elem.position === positionCard) {
					elem.open = true;
				}
				if (elem.open === true) openedCards.push(elem);
			});

			let responseData = [];

			switch (openedCards.length) {
				case 1:
					res.setHeader('Content-Type', 'application/json');
					responseData = ['open'];
					res.end(JSON.stringify(responseData));
					break;

				case 2:
					if (openedCards[0].kitId === openedCards[1].kitId) {
						openedCards[0].open = 'freeze';
						openedCards[1].open = 'freeze';
						res.setHeader('Content-Type', 'application/json');
						const win = lib.checkWin(game);
						const state = win ? 'win' : 'freeze';
						responseData = [state, openedCards[0].position, openedCards[1].position];
						res.end(JSON.stringify(responseData));
					} else {
						res.setHeader('Content-Type', 'application/json');
						responseData = ['freezeErr', openedCards[0].position, openedCards[1].position];
						res.end(JSON.stringify(responseData));
					}
					break;

				case 3:
					openedCards.forEach(elem => {
						if (elem.position !== positionCard) elem.open = false;
					});
					res.setHeader('Content-Type', 'application/json');
					responseData = ['freezeErr'];
					res.end(JSON.stringify(responseData));
					break;
			}

			allGames[gameID] = game;

			fs.writeFile(path.join(__dirname, '../allGames.json'), JSON.stringify(allGames), error => {
				if (error) throw error;
			});

		});
	});

}

module.exports = compareCards;