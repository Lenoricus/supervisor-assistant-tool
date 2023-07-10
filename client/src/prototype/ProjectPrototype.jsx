import {makeAutoObservable} from "mobx";

export default class ProjectPrototype {
	constructor() {
		this._teams = []
		this._projects = []
		this._selectedTeam = {}
		makeAutoObservable(this)
	}

	setProjects(projects) {
		this._projects = projects
	}

	setTeams(teams) {
		this._teams = teams
	}

	setSelectedTeam(team) {
		this._selectedTeam = team
	}


	get projects() {
		return this._projects
	}

	get teams(){
		return this._teams
	}

	get selectedTeam() {
		return this._selectedTeam
	}
}