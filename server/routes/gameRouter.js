import * as game from '../controllers/gameController';

const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({test: "test"})
});


router.get('/:gameId/:direction', async (req, res) => {
    try {
        const getGameData = await game.move(req.params.gameId, req.params.direction);
        res.status(getGameData.code).json(getGameData);

    }
    catch (err){
        res.status(500).json({err: err})
    }
});

router.get('/create', async (req, res) => {
    try {
        const createData = await game.createGame();
        res.status(createData.code).json(createData);
    }
    catch(err) {
        res.status(500).json({err: err})
    }
});

router.get('/:gameId', async (req, res) => {
    try {
        const rData = await game.getGame(req.params.gameId);
        res.status(rData.code).json(rData);
    }
    catch(err){
        res.status(500).json({err: err})
    }

});

export default router;
