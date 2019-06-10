const Game = require('./classes/Game');
const mongoose = require('mongoose');

const gamePage = (err, cb, params) => {
  const game = new Game(params);

  mongoose.connect('mongodb://localhost/memojiGameDB', { useNewUrlParser: true })
    .then(() => console.log())
    .catch(e => console.log(e));
  
  require('../models/game.model');

  const ModelGame = mongoose.model('games');

  const currentGame = new ModelGame({
    numberCardsField: game.numberCardsField,
    timeOfGame: game.timeOfGame,
    playingCards: game.playingCards,
    win: game.win,
    lose: game.lose
  });

  currentGame.save()
    .then( game => {

      const blanks = game.playingCards.map( elem => {
        return  { position: elem.position };
      });

      const blankGame = {
        gameID: game._id,
        sec: game.timeOfGame,
        cards: blanks
      };
      cb(blankGame);
    })
    .catch( e => console.log(e) );
};

module.exports = gamePage;