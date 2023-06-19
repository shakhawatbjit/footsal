const express = require('express');
const TeamController = require('../controllers/team'); 
const validator = require('../middlewares/validation');
const router = express.Router();

router.post('/addteam', validator.addTeam, TeamController.addTeam);
router.get('/teams', TeamController.getTeamList);
router.get('/teams/:teamId', TeamController.getTeam);
router.put('/edit-team/:id', validator.editTeam, TeamController.editTeam);
router.delete('/delete-team/:id', TeamController.deleteTeam); 

module.exports = router;