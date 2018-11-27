const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GamesSchema = new Schema ({

  numberCardsField: {
    type: Number,
    required: true
  },

  timeOfGame: {
    type: Number,
    required: true
  },

  playingCards: {
    type: [Object],
    required: true
  },

  win: {
    type: Boolean,
    default: false
  },

  lose: {
    type: Boolean,
    default: false
  }

});

mongoose.model('games', GamesSchema);