const Field = require('./classes/Field');
const fs = require('fs');
const path = require('path');

function createField(req, res, lib) {
	let gameID = '';

	req.on('data', data => gameID += data);
	req.on('end', () => {
		fs.readFile(path.join(__dirname, '../allGames.json'), 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-type': 'text/plain' });
				res.end('Ошибка на сервере');
			}
			let allGames = JSON.parse(data);
			const field = new Field(allGames[gameID]);
			field.createField();
		});
	});

}

module.exports = createField;