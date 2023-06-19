const express = require('express');
const PlayerController = require('../controllers/player'); 
const validator = require('../middlewares/validation');
const router = express.Router();

router.post('/addplayer', validator.addplayer, PlayerController.addPlayer);
router.get('/players', PlayerController.getPlayerList);
router.get('/players/:teamId', PlayerController.getPlayerByTeam);
router.get('/players/:id', PlayerController.getPlayer);
router.put('/edit-player/:id',validator.editPlayer, PlayerController.editPlayer);
router.delete('/delete-player/:id', PlayerController.deletePlayer); 

module.exports = router;