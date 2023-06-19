const express = require('express');
const Player = require('../models/player');
const Team = require('../models/team');  
const { success } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus'); 
const { ObjectID } = require('mongodb');  
const { validationResult } = require('express-validator');

class PlayerController {
    // add a new player
    async addPlayer(req, res, next){
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            } 

            const name  = req.body.name;
            const role = req.body.role; 
            const teamId = req.body.teamId; 
            const imageLink = req.body.imageLink; 
            const description = req.body.description;             
            const phoneNumber = req.body.phoneNumber; 
            const player = new Player({name, role, teamId, imageLink, description, phoneNumber});
            await player.save();   
            return res.status(HTTP_STATUS.OK).send(success('Player is Created Succesfully', player));
        } catch (error) {
            next(error);
        }          
    }
    // Gets all player with all details
    async getPlayerList(req, res, next) {
        try {
            const players = await Player.find().exec();
            return res.status(HTTP_STATUS.OK).send(success('All player data fetched successfully', players));
        } catch (error) {
            next(error);
        }
    }

    // Get player by team
    async getPlayerByTeam(req, res, next) {
        try {
            const teamId = req.params.teamId;           
            const player = await Player.find({ team: teamId }).populate('team','name').exec();
            return res.status(HTTP_STATUS.OK).send(success('All player data fetched successfully', player));
        } catch (error) {
            next(error);
        }
    }
    // Get a specific player by id
    async getPlayer(req, res, next) {
        try {
            const playerId = req.params.id;
            const player = await Player.findById(playerId).populate('team','name').exec();
            if (player) {
                return res.status(HTTP_STATUS.OK).send(success('player Found', player));
            } else {
                return res.status(HTTP_STATUS.OK).send(failure('player Not Found', player));
            }
        } catch (error) {
            next(error);
        }
    }


    async editPlayer(req, res, next) {
        try { 

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }  

            const playerId = req.params.id;           
            const updatedPlayer = await Player.findOne({_id: playerId}).exec();
            if (updatedPlayer) {
                updatedPlayer.name = req.body.name? req.body.name: updatedPlayer.name;
                updatedPlayer.role = req.body.role? req.body.role: updatedPlayer.role;   
                updatedPlayer.teamId = req.body.teamId? req.body.teamId: updatedPlayer.teamId;
                updatedPlayer.imageLink = req.body.imageLink? req.body.imageLink: updatedPlayer.imageLink;      
                updatedPlayer.description = req.body.description? req.body.description: updatedPlayer.description;    
                updatedPlayer.phoneNumber = req.body.phoneNumber? req.body.phoneNumber: updatedPlayer.phoneNumber;    
                await updatedPlayer.save();                
                return res
                    .status(HTTP_STATUS.OK)
                    .send(
                        success('Player is updated successfully', updatedPlayer)
                );
            }
            return res
                    .status(HTTP_STATUS.NOT_FOUND)
                    .send(
                        failure('Player is not found to update')
                    );
        } catch (error) {           
            next(error);
        }
    }

 
    async deletePlayer(req, res, next) {
        try {
            const playerId = req.params.id;           
            const player = await Player.findOne({_id: playerId}).exec();
            if (player) {   
                await Player.findOneAndDelete({_id: playerId}).exec();
                return res.status(HTTP_STATUS.OK).send(success('Player is deleted successfully'));
            }
            return res
            .status(HTTP_STATUS.NOT_FOUND)
            .send(
                failure('Player is not found to delete')
            );
        } catch (error) {           
            next(error);
        }
    }
}

module.exports = new PlayerController();