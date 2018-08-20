const fs = require('fs');
const path = require('path');

function getCardsOfField(req, res, lib) {
	let gameID = '';

	req.on('data', data => gameID += data);
	req.on('end', () => {
		fs.readFile(path.join(__dirname, '../allGames.json'), 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-type': 'text/plain' });
				res.end('Ошибка на сервере');
			}
			let allGames = JSON.parse(data);
			allGames[gameID].playingCards.forEach( elem => {
				delete elem.kitId;
			});
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(allGames[gameID]));
		});
	});

}

module.exports = getCardsOfField;