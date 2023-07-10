import {makeAutoObservable} from "mobx";

export default class TaskPrototype {
	constructor() {
		this._statuses = []
		this._projects = []
		this._selectedStatus = {}
		this._selectedProject = {}
		this._tasks = []
		makeAutoObservable(this)
	}

	setSelectedStatus(status) {
		this._selectedStatus = status
	}

	setSelectedProject(project) {
		this._selectedProject = project
	}

	setTasks(tasks) {
		this._tasks = tasks
	}

	setStatuses(statuses) {
		this._statuses = statuses
	}

	setProjects(projects) {
		this._projects = projects
	}

	get tasks() {
		return this._tasks
	}

	get statuses(){
		return this._statuses
	}

	get projects(){
		return this._projects
	}

	get selectedStatus() {
		return this._selectedStatus
	}

	get selectedProject() {
		return this._selectedProject
	}
}