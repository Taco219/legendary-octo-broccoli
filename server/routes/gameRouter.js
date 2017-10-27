import * as game from '../controllers/gameController';

const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
    res.send("test")
});

router.get('/m/:gameId/:direction', async (req, res) => {
    const a = await game.move(req.params.gameId, req.params.direction);
    res.send(a);
});

router.get('/create', async (req, res) => {
    const a = await game.createGame();
    res.send(a);
});

export default router;
