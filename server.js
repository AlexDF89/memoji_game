// const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const { public, startPage, gamePage } = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	startPage(req, res);
});

app.get(/\.(css|js)/, (req, res) => {
	public(req, res);
});

app.post('/game', (req, res) => {
	let game = {
		cards: req.body.cards,
		sec: req.body.sec
	};

	game.err = false;

	if (game.cards > 20 || game.sec > 300) {

		game.err = true;
		game.errMess = 'Количество карт должно быть от 4 до 20. Время игры должно быть от 10 до 300 секунд!';

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.send(game);
		res.end();
	} else {
		game = gamePage(game);
		game = {cards: game.playingCards, sec: game.timeOfGame};
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');

		res.send(game);
		res.end();
	}

});

app.listen(3000, console.log("Сервер работает. http://localhost:3000."));


// const { render, lib, startGame } = require('./lib');
// const { public, startPage, game, compareCards,	notFound } = require('./routes');
// http.ServerResponse.prototype.render = render;

// http.createServer((req, res) => {
// 	if (req.url.match(/\.(css|js)/)) {
// 		public(req, res);
// 	} else if (req.url === '/') {
// 		startPage(req, res);
// 	} else if (req.url === '/game') {
// 		game(req, res, lib);
// 	} else if (req.url === '/compareCards') {
// 		compareCards(req, res, lib);
// 	} else {
// 		notFound(req, res);
// 	}
// }).listen(3000, () => console.log('Сервер работает. Порт:3000'));