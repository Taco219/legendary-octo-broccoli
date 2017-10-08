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

        // check if there is a block
        const block = await Thing.findOne({gameId: game._id, type: 'block', xAxis: player.xAxis, yAxis: player.yAxis}).exec();
        if(block){
            return { code: 400, message: 'Cant move there because of a block!'}
        }

        // save movement
        await player.save();
        await game.save();

        // check if goal is reached
        if(player.xAxis === game.goalXAxis && player.yAxis === game.goalYAxis){
            win = true;
        }

        // return stuff
        return { code: 200, player: player, goal: [ game.goalXAxis, game.goalYAxis], win: win }
    }
    catch (err) {
        console.log('err');
        console.log(err);
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

        // create player
        const player = new Thing({
            gameId: game._id,
            type: 'player',
            xAxis: 0,
            yAxis: 0
        });

        // create block
        const block = new Thing({
            gameId: game._id,
            type: 'block',
            xAxis: 1,
            yAxis: 1
        });

        // save block and player
        await player.save();
        await block.save();

        return { gameId: game._id }
    }
    catch (err){
        console.error(err);
        return err;
    }
};

