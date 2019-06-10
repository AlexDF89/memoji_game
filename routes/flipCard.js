const mongoose = require('mongoose');


const flipCard = (err, cb, clickedCard) => {

  mongoose.connect('mongodb://localhost/memojiGameDB', { useNewUrlParser: true })
  .then(() => console.log())
  .catch(e => console.log(e));

  require('../models/game.model');

  const ModelGame = mongoose.model('games');

  ModelGame.find({ _id: clickedCard.gameID })
    .then(game => {

      if (clickedCard.lose) {
        game[0].lose = true;
      } else {
        const openedCards = [];
        let freezedCards = 0;

        game[0].playingCards.forEach( (card, i, arr) => {

          if (card.freeze) freezedCards += 1;
          if (freezedCards === game[0].length) game[0].win = true;

          if (card.opened === true) {
            card.index = i;
            openedCards.push(card);
          }

          if (clickedCard.position == card.position) {
            if (!card.opened && !card.freeze && !card.freezeErr) {
              card.opened = true;
              card.index = i;
              openedCards.push(card);
            }
          }

        });

        switch (openedCards.length) {
          case 2: {
            if (openedCards[0].kitId === openedCards[1].kitId) {
              openedCards.forEach(elem => {
                game[0].playingCards[elem.index].freeze = true;
                game[0].playingCards[elem.index].opened = false;
                if (elem.freeze) freezedCards += 1;
                if (freezedCards === game[0].playingCards.length) game[0].win = true;
              });
            } else {
              openedCards.forEach(elem => {
                game[0].playingCards[elem.index].freezeErr = true;
              });
            }
            break;
          }
          case 3: {
            openedCards.forEach(elem => {
              if (elem.position != clickedCard.position) {
                game[0].playingCards[elem.index].freezeErr = false;
                game[0].playingCards[elem.index].opened = false;
              }
            });
            break;
          }
        }
      }      

      const updGame = new ModelGame(game[0]);

      updGame.save()
        .then(game => {
          const updatedGame = {};
          updatedGame.cards = [];

          updatedGame.win = game.win;
          updatedGame.lose = game.lose;

          game.playingCards.forEach( (elem, i) => {
            updatedGame.cards[i] = {};
            if (elem.opened) {
              updatedGame.cards[i].image = elem.image;
              updatedGame.cards[i].opened = true;
            }
            if (elem.freeze) {
              updatedGame.cards[i].image = elem.image;
              updatedGame.cards[i].freeze = true;
            }
            if (elem.freezeErr) updatedGame.cards[i].freezeErr = true;
            updatedGame.cards[i].position = elem.position;
          });
          cb(updatedGame);
        })
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));

};

module.exports  = flipCard;