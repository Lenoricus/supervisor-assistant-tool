const {Status} = require('../models/models')

class StatusController {
	async create(req, res) {
		const {title} = req.body
		const status = await Status.create({title})
		return res.json(status)
	}

	async getAll(req, res) {
		const statuses = await Status.findAll()
		return res.json(statuses)
	}

}

module.exports = new StatusController()