import * as game from '../controllers/gameController';

const express = require('express');

const router = express.Router();

router.get('/:direction', async (req, res) => {
    const a = await game.move(req.params.direction);
    res.send(a);
});

export default router;