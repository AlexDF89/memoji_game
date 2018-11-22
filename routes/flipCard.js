const mongoose = require('mongoose');


const flipCard = (err, cb, clickedCard) => {

  mongoose.connect('mongodb://localhost/memojiGameDB', { useNewUrlParser: true })
  .then(() => console.log('MongoDB has started'))
  .catch(e => console.log(e));

  require('../models/game.model');

  const ModelGame = mongoose.model('games');

  ModelGame.find({ _id: clickedCard.gameID })
    .then(game => {

      let prevOpenedCard = {};

      game[0].playingCards.forEach( (card, i, arr) => {

        if (card.opened && !card.freezed) {
          prevOpenedCard = card;
          prevOpenedCard.index = i;
        }

        if (clickedCard.position == card.position) {
          game[0].playingCards[i].opened = true;

          if (game[0].playingCards[i].kitId === prevOpenedCard.kitId) {
            game[0].playingCards[i].freezed = true;
            game[0].playingCards[prevOpenedCard.index].freezed = true;
          }

        }
      });      

      const updGame = new ModelGame(game[0]);

      updGame.save()
        .then(game => {
          const updatedGame = [];
          game.playingCards.forEach( (elem, i) => {
            updatedGame[i] = {};
            if (elem.opened) {
              updatedGame[i].image = elem.image;
            }
            updatedGame[i].position = elem.position;
          });
          cb(updatedGame);
        })
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));

};

module.exports  = flipCard;