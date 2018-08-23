const Card = require('./Card');
const lib = require('../../lib/lib');

class Game {
	constructor(params) {
		this.numberCardsField = parseInt(this.getNumberCards(params.numberOfCards));
		this.timeOfGame = parseInt(params.timeOfGame);
		this.playingCards = this.createKitOfCards();
		this.date = Date.now();

		lib.getGameID((err, data) => {
			if (err) throw new Error('Ошибка на сервере');
			this.gameID = data;
		});

	}

	static get images() {
		return ['&#128054;','&#128049;','&#128045;','&#128057;','&#128048;','&#128059;','&#128060;','&#128040;','&#128047;','&#129409;','&#128046;','&#128055;','&#128056;','&#128025;','&#128053;','&#129412;','&#128030;','&#129408;','&#128031;','&#128010;','&#128019;','&#129411;','&#128063;'];
	}

	static get shuffledCards() {
		return Game.shuffle(Game.images, Game.images.length);
	}

	static shuffle(elements, resultArrLength) {
		const result = [];
		while (result.length !== resultArrLength) {
			const randomNumber = Math.floor(Math.random() * resultArrLength);
			if ( result.indexOf(elements[randomNumber]) === -1) {
				result.push(elements[randomNumber]);
			}
		}
		return result;
	}

	getNumberCards(num) {
		if (isNaN(num) || (num < 4) || (num > Game.images.length)) {
			throw new Error(`Количество карт должно быть от 4 до ${Game.images.length}`);
		}
		if (num % 2 !== 0) num -= 1;
		return num;
	}
	createKitOfCards() {
		const images = this.getCardsOfField();
		const result = [];
		const elements = [];
		for (let i = 0; i < images.length; i++) {
			const card = this.cardBlank(images[i]);
			card.position = i;
			elements.push(card);
		}
		while (result.length !== elements.length ) {
			let i = Game.shuffle(elements, this.numberCardsField);
			i = i[0];
			if ((result.indexOf(i) === -1)) {
				result.push(i);
			}
		}
		return result;
	}
	getCardsOfField() {
		const images = Game.shuffledCards;
		const resultArrLength = this.numberCardsField/2;
		const result = [];
		const cards = Game.shuffle(images, resultArrLength);
		while (cards.length !== 0) {
			const card = new Card(cards[cards.length - 1]);
			card.kitId = cards.length - 1;
			result.push(card);
			const twinCard = new Card(cards.pop());
			twinCard.kitId = cards.length;
			result.push(twinCard);
		}
		return result;		
	}
	cardBlank(image) {
		const result = {};
		result.image = image.image;
		result.kitId = image.kitId;
		result.open = false;
		return result;		
	}
}

module.exports = Game;