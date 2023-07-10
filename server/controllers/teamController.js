const {Team, User} = require("../models/models");
const ApiError = require('../error/ApiError');

class TeamController {
    async create(req, res) {
        const {title} = req.body
        const team = await Team.create({title})
        return res.json(team)
    }

    async getAll(req, res) {
        const teams = await Team.findAll()
        return res.json(teams)
    }

    async getOne(req, res){
        const {id} = req.params
        const team = await Team.findOne(
            {
                where:{id}
            },
        )
        return res.json(team)
    }
}

module.exports = new TeamController()