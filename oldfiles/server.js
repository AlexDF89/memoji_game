const http = require('http');


const { render, lib, startGame } = require('./lib');
const { public, startPage, game, compareCards,	notFound } = require('./routes');
http.ServerResponse.prototype.render = render;

http.createServer((req, res) => {
	if (req.url.match(/\.(css|js)/)) {
		public(req, res);
	} else if (req.url === '/') {
		startPage(req, res);
	} else if (req.url === '/game') {
		game(req, res, lib);
	} else if (req.url === '/compareCards') {
		compareCards(req, res, lib);
	} else {
		notFound(req, res);
	}
}).listen(3000, () => console.log('Сервер работает. Порт:3000'));