const {Task, Status, Project} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
class TaskController {
    async create(req, res, next) {
        try {
            const {title, projectId, statusId, startDate, planned, spent, description} = req.body

            const task = await Task.create({title, projectId, statusId, startDate, planned, spent, description})

            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {statusId, projectId, page, limit} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let tasks;

        if (!statusId && !projectId) {
            tasks = await Task.findAndCountAll({limit, offset, include: [{ model: Status, required: false}, { model: Project, required: false}]})
        }
        if (statusId && !projectId) {
            tasks = await Task.findAndCountAll({where:{statusId, limit, offset}})
        }
        if (!statusId && projectId) {
            tasks = await Task.findAndCountAll({where:{projectId, limit, offset}})
        }
        if (statusId && projectId) {
            tasks = await Task.findAndCountAll({where:{statusId, projectId, limit, offset}})
        }
        return res.json(tasks)
    }

    async getOne(req, res){
        const {id} = req.params
        const task = await Task.findOne(
            {
                where:{id}
            },
        )
        return res.json(task)
    }
}

module.exports = new TaskController()