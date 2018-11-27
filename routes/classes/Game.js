const Card = require('./Card');

class Game {
  
  constructor(params) {
		this.images = ['&#128054;','&#128049;','&#128045;','&#128057;','&#128048;','&#128059;','&#128060;','&#128040;','&#128047;','&#129409;','&#128046;','&#128055;','&#128056;','&#128025;','&#128053;','&#129412;','&#128030;','&#129408;','&#128031;','&#128010;','&#128019;','&#129411;','&#128063;'];
		this.win = false;
		this.lose = false;

    this.numberCardsField = parseFloat(params.cards);
    this.timeOfGame = parseFloat(params.sec);
		this.playingCards = this.createKitOfCards();
  }
  
	createKitOfCards() {
    const images = this.getCardsOfField();
		const result = [];
		const elements = [];
		for (let i = 0; i < images.length; i++) {
			const card = this.cardBlank(images[i]);
			card.position = i;
			card.freezed = false;
			card.freezeErr = false;
			elements.push(card);
		}
		while (result.length !== elements.length ) {
			let i = this.shuffle(elements, this.numberCardsField);
			i = i[0];
			if ((result.indexOf(i) === -1)) {
				result.push(i);
			}
    }
		return result;
  }
  
	getCardsOfField() {
		const images = this.shuffle(this.images, this.numberCardsField);
		const resultArrLength = this.numberCardsField/2;
		const result = [];
		const cards = this.shuffle(images, resultArrLength);
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
    
	shuffle(elements, resultArrLength) {
		const result = [];
		while (result.length !== resultArrLength) {
			const randomNumber = Math.floor(Math.random() * resultArrLength);
			if ( result.indexOf(elements[randomNumber]) === -1) {
				result.push(elements[randomNumber]);
			}
		}
		return result;
  }
  
	cardBlank(image) {
		const result = {};
		result.image = image.image;
		result.kitId = image.kitId;
		result.opened = false;
		return result;		
	}

}

module.exports = Game;