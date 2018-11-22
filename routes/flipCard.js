const mongoose = require('mongoose');


const flipCard = (err, cb, clickedCard) => {

  mongoose.connect('mongodb://localhost/memojiGameDB', { useNewUrlParser: true })
  .then(() => console.log('MongoDB has started'))
  .catch(e => console.log(e));

  require('../models/game.model');

  const ModelGame = mongoose.model('games');

  ModelGame.find({ _id: clickedCard.gameID })
    .then(game => {

      game[0].playingCards.forEach( (card, i, arr) => {
        if (clickedCard.position == card.position) {
          game[0].playingCards[i].opened = true;
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