const {UserTeams, User, Team, Role, Qualification} = require("../models/models");

class UserTeamController {
	async create(req, res) {
		const {userId, teamId, roleId, qualificationId} = req.body
		const userTeam = await UserTeams.create({userId, teamId, roleId, qualificationId})
		return res.json(userTeam)
	}

	async getAll(req, res) {
		let userTeams
		userTeams = await UserTeams.findAll({include: [{ model: User, required: false}, { model: Team, required: false}, { model: Role, required: false}, { model: Qualification, required: false}], order: [[Team, 'title']]});
		return res.json(userTeams)
	}
}

module.exports = new UserTeamController()