const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    player: { type: [] },
    goalXAxis: { type: Number },
    goalYAxis: { type: Number }
});

const Game = mongoose.model('Game', gameSchema);
export default Game;