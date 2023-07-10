import {makeAutoObservable} from "mobx";

export default class UserTaskPrototype {
	constructor() {
		this._tasks = []
		this._users = []
		this._selectedUser = {}
		this._selectedTask = {}
		this._userTasks = []
		makeAutoObservable(this)
	}

	setSelectedUser(user) {
		this._selectedUser = user
	}

	setSelectedTask(task) {
		this._selectedTask = task
	}

	setUserTasks(userTasks) {
		this._userTasks = userTasks
	}

	setUsers(users) {
		this._users = users
	}

	setTasks(tasks) {
		this._tasks = tasks
	}

	get userTasks() {
		return this._userTasks
	}

	get users(){
		return this._users
	}

	get tasks(){
		return this._tasks
	}

	get selectedUser() {
		return this._selectedUser
	}

	get selectedTask() {
		return this._selectedTask
	}
}