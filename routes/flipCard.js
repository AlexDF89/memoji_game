const mongoose = require('mongoose');


const flipCard = (err, cb, clickedCard) => {

  mongoose.connect('mongodb://localhost/memojiGameDB', { useNewUrlParser: true })
  .then(() => console.log('MongoDB has started'))
  .catch(e => console.log(e));

  require('../models/game.model');

  const ModelGame = mongoose.model('games');

  ModelGame.find({ _id: clickedCard.gameID })
    .then(game => {

      const openedCards = [];

      game[0].playingCards.forEach( (card, i, arr) => {

        if (card.opened === true) {
          card.index = i;
          openedCards.push(card);
        }

        if (clickedCard.position == card.position) {
          card.opened = true;
          card.index = i;
          openedCards.push(card);
        }

      });

      switch (openedCards.length) {
        case 2: {
          if (openedCards[0].kitId === openedCards[1].kitId) {
            openedCards.forEach(elem => {
              game[0].playingCards[elem.index].freeze = true;
              game[0].playingCards[elem.index].opened = false;
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

      const updGame = new ModelGame(game[0]);

      updGame.save()
        .then(game => {
          const updatedGame = [];
          game.playingCards.forEach( (elem, i) => {
            updatedGame[i] = {};
            if (elem.opened) {
              updatedGame[i].image = elem.image;
              updatedGame[i].opened = true;
            }
            if (elem.freeze) {
              updatedGame[i].image = elem.image;
              updatedGame[i].freeze = true;
            }
            if (elem.freezeErr) updatedGame[i].freezeErr = true;
            updatedGame[i].position = elem.position;
          });
          cb(updatedGame);
        })
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));

};

module.exports  = flipCard;