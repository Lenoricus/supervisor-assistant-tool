const {UserTasks, User, Task} = require("../models/models");

class UserTaskController {
	async create(req, res) {
		const {userId, taskId, startWork, finishWork} = req.body
		const userTask = await UserTasks.create({userId, taskId, startWork, finishWork})
		return res.json(userTask)
	}

	async getAll(req, res) {
		let userTasks
		userTasks = await UserTasks.findAll({include: [{ model: User, required: false}, { model: Task, required: false}]});
		return res.json(userTasks)
	}
}

module.exports = new UserTaskController()