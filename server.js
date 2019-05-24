const express = require('express');
const app = express();
const { public, startPage, gamePage, flipCard } = require('./routes');
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

		const cb = blankGame => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
	
			res.send(blankGame);
			res.end();
		};

		const err = err => {
			console.log(err);
		};

		gamePage(err, cb, game);
	}

});

app.post('/flip', (req, res) => {
	const clickedCard = {
		gameID: req.body.gameID,
		position: req.body.position,
		lose: req.body.lose
	}

	const cb = game => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');

		res.send(game);
		res.end();
	};

	const err = err => {
		console.log(err);
	};

	flipCard(err, cb, clickedCard);
});

app.listen(3002, console.log("Сервер работает. http://localhost:3002."));
