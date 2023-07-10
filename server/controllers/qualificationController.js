const {Qualification} = require("../models/models");

class QualificationController {
	async create(req, res) {
		const {title} = req.body
		const qualification = await Qualification.create({title})
		return res.json(qualification)
	}

	async getAll(req, res) {
		const qualifications = await Qualification.findAll()
		return res.json(qualifications)
	}
}

module.exports = new QualificationController()