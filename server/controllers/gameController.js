import Game from '../models/gameModel';
import Thing from '../models/thingModel'

export const move = async (gameId, direction) => {
    try {
        // get game and player
        const game = await Game.findById(gameId).exec();
        const player = await Thing.findOne({gameId: game._id, type: 'player'}).exec();
        let win = false;

        // move the player
        switch (direction){
            case "up":
                player.yAxis++;
                break;
            case "down":
                player.yAxis--;
                break;
            case "left":
                player.xAxis--;
                break;
            case "right":
                player.xAxis++;
                break;
        }

        // check if there is block
        const block = await Thing.findOne({gameId: game._id, type: 'block', xAxis: player.xAxis, yAxis: player.yAxis}).exec();
        if(block){
            // space not free because of block
            return { code: 400, message: 'Cant move there because of a block!'}
        }

        // save movement
        await player.save();
        await game.save();

        // check if goal is reached
        if(player.xAxis === game.goalXAxis && player.yAxis === game.goalYAxis){
            win = true;
        }

        // return player and has won
        return { code: 200, player: player, win: win }
    }
    catch (err) {
        console.log('err');
        console.log(err);
        throw err;
    }
};

export const getGame = async (gameId) => {
    try {
        // get game
        const game = await Game.findById(gameId).exec();
        // get 1 player by game id
        const player = await Thing.findOne({gameId: game._id, type: "player"}).exec();
        // get all blocks by game id
        const blocks = await Thing.find({gameId: game._id, type: "block"}).exec();

        // return game, player and blocks
        return { code: 200, game: game, player: player, blocks: blocks}
    }
    catch(err) {
        console.error("get game err");
        console.error(err);
        throw err;
    }
};

export const createGame = async () => {
    try {
        // create game
        const game = new Game({
            goalXAxis: 2,
            goalYAxis: 2
        });

        // save game and get _id value
        await game.save();

        // create player based on game._id
        const player = new Thing({
            gameId: game._id,
            type: 'player',
            xAxis: 0,
            yAxis: 0
        });

        // create block based on game._id
        const block = new Thing({
            gameId: game._id,
            type: 'block',
            xAxis: 1,
            yAxis: 1
        });

        // save block and player
        await player.save();
        await block.save();

        // returns game id
        return { code: 200, gameId: game._id }
    }
    catch (err){
        console.error(err);
        throw err;
    }
};

