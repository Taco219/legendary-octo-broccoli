const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    gameId  : { type: mongoose.Schema.ObjectId, ref: 'Game' },
    type    : { type: String, enum :["player", "block"]},
    xAxis   : { type: Number },
    yAxis   : { type: Number }
});

const Thing = mongoose.model('Thing', thingSchema);
export default Thing;