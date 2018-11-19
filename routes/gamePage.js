

const Game = require('./classes/Game');

const gamePage = (params) => {
  return new Game(params);
};

module.exports = gamePage;