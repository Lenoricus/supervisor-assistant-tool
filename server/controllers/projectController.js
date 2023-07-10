const {Project, Team} = require("../models/models");

class ProjectController {
    async create(req, res) {
        const {title, startDate, description, teamId} = req.body
        const project = await Project.create({title, startDate, description, teamId})
        return res.json(project)
    }

    async getAll(req, res) {
        const projects = await Project.findAll({include: [{ model: Team, required: false}], order: [['title', 'ASC']]})
        return res.json(projects)
    }

    async getOne(req, res){
        const {id} = req.params
        const project = await Project.findOne(
            {
                where:{id}
            },
        )
        return res.json(project)
    }

    async delete(req, res){
        const {id} = req.params
        const project = await Project.destroy(
            {
                where:{id}
            },
        )
        return res.json(project)
    }

    async update(req, res){
        const {id} = req.params
        const {title, startDate, description, teamId} = req.body
        const project = await Project.update(
            {
                title, startDate, description, teamId
            },
            {
                where:{id},
                returning: true
            }
        )
        return res.json(project)
    }
}

module.exports = new ProjectController()