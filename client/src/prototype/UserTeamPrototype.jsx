import {makeAutoObservable} from "mobx";

export default class UserTeamPrototype {
	constructor() {
		this._users = []
		this._teams = []
		this._roles = []
		this._qualifications = []
		this._selectedUser = {}
		this._selectedTeam = {}
		this._selectedRole = {}
		this._selectedQualification = {}
		this._userTeams = []
		makeAutoObservable(this)
	}

	setSelectedUser(user) {
		this._selectedUser = user
	}

	setSelectedTeam(team) {
		this._selectedTeam = team
	}

	setSelectedRole(role) {
		this._selectedRole = role
	}

	setSelectedQualification(qualification) {
		this._selectedQualification = qualification
	}

	setUserTeams(userTeams) {
		this._userTeams = userTeams
	}

	setUsers(users) {
		this._users = users
	}

	setTeams(teams) {
		this._teams = teams
	}

	setRoles(roles) {
		this._roles = roles
	}

	setQualifications(qualifications) {
		this._qualifications = qualifications
	}

	get userTeams() {
		return this._userTeams
	}

	get users(){
		return this._users
	}

	get teams(){
		return this._teams
	}

	get roles(){
		return this._roles
	}

	get qualifications(){
		return this._qualifications
	}

	get selectedUser() {
		return this._selectedUser
	}

	get selectedTeam() {
		return this._selectedTeam
	}

	get selectedRole() {
		return this._selectedRole
	}

	get selectedQualification() {
		return this._selectedQualification
	}
}