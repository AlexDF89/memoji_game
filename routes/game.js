const Game = require('./classes/Game');

let game;

function game(req, res, lib) {

	let body = '';

	req.setEncoding('utf-8');
	req.on('data', data => body += data);
	req.on('end', () => {
		const data = lib.parseBody(body);
		game = new Game(data);
		res.writeHead(200, { 'Content-type': 'text/html' });
		res.render('memoji_game.html');
	});
}

module.exports = game;