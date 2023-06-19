const Team = require('../models/team'); 
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');

class TeamController {
    // Create a new team
    async addTeam(req, res, next){
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            } 

            const name  = req.body.name;
            const logoLink = req.body.logoLink; 
            const team = new Team({name, logoLink});
            await team.save();   
            return res.status(HTTP_STATUS.OK).send(success('Team is Created Succesfully', team));
        } catch (error) {
            next(error);
        }          
    }

    // Gets all teams with all details
    async getTeamList(req, res, next) {
        try {
            const teams = await Team.find().exec();
            return res.status(HTTP_STATUS.OK).send(success('All teams data fetched successfully', teams));
        } catch (error) {
            next(error);
        }
    }
    // Get a specific Team by id
    async getTeam(req, res, next) {
        try {
            const teamId = req.params.teamId;
            const team = await Team.findById(teamId).exec();
            if (team) {
                return res.status(HTTP_STATUS.OK).send(success('Team Found', team));
            } else {
                return res.status(HTTP_STATUS.OK).send(failure('Team Not Found', team));
            }
        } catch (error) {
            next(error);
        }
    }
    async editTeam(req, res, next) {
        try { 

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            } 
            
            const teamId = req.params.id;           
            const updatedTeam = await Team.findOne({_id: teamId}).exec();
            if (updatedTeam) {
                updatedTeam.name = req.body.name? req.body.name: updatedTeam.name;
                updatedTeam.logoLink = req.body.logoLink? req.body.logoLink: updatedTeam.logoLink;        
                await updatedTeam.save();                
                return res
                    .status(HTTP_STATUS.OK)
                    .send(
                        success('Team is updated successfully', updatedTeam)
                );
            }
            return res
                    .status(HTTP_STATUS.NOT_FOUND)
                    .send(
                        failure('Team is not found to update')
                    );
        } catch (error) {           
            next(error);
        }
    }

    async deleteTeam(req, res, next) {
        try {
            const teamId = req.params.id;           
            const team = await Team.findOne({_id: teamId}).exec();
            if (team) {   
                await Team.findOneAndDelete({_id: teamId}).exec();
                return res.status(HTTP_STATUS.OK).send(success('Team is deleted successfully'));
            }
            return res
            .status(HTTP_STATUS.NOT_FOUND)
            .send(
                failure('Team is not found to delete')
            );
        } catch (error) {           
            next(error);
        }
    }
}

module.exports = new TeamController();