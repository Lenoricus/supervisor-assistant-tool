const {Role} = require("../models/models");

class RoleController {
	async create(req, res) {
		const {title} = req.body
		const role = await Role.create({title})
		return res.json(role)
	}

	async getAll(req, res) {
		const roles = await Role.findAll()
		return res.json(roles)
	}
}

module.exports = new RoleController()