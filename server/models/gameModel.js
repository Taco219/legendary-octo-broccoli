const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    goalXAxis: { type: Number },
    goalYAxis: { type: Number }
});

const Game = mongoose.model('Game', gameSchema);
export default Game;
