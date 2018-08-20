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

			const game = allGames[data[1]];
			const openedCards = [];

			game.playingCards.forEach((elem, i) => {
				if (elem.position === data[0]) {
					elem.open = true;
				}
				if (elem.open === true) openedCards.push(elem);
			});

			console.log(openedCards.length);

			switch (openedCards.length) {
				case 1:
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(['open']);
					break;

				case 2:
					if (openedCards[0].kitId === openedCards[1].kitId) {
						res.writeHead(200, {'Content-Type': 'application/json'});
						const data = ['freeze', openedCards[0].position, openedCards[1].position];
						res.end(JSON.stringify(data));
					} else {
						res.writeHead(200, {'Content-Type': 'application/json'});
						const data = ['freezeErr', openedCards[0].position, openedCards[1].position];
						res.end(JSON.stringify(data));
					}
					break;

				case 3:
					openedCards.forEach(elem => {
						if (elem.position !== data[0]) elem.open = false;
					});
					res.writeHead(200, {'Content-Type': 'application/json'});
					const data = ['freezeErr'];
					res.end(JSON.stringify(data));
					break;
			}

		});
	});

}

module.exports = compareCards;