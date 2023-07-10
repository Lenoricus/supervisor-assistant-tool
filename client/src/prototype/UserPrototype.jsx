import {makeAutoObservable} from "mobx";

export default class UserPrototype {
	constructor() {
		this._isAuth = false
		// let a = localStorage.getItem('isAuthorized')
		// this._isAuth = a || false
		// console.log(a)
		// разобраться с локал сторадж
		this._user = {}
		this._employees = []
		makeAutoObservable(this)
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}

	setUser(user) {
		this._user = user
	}

	setEmployees(employees) {
		this._employees = employees
	}


	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}

	get employees() {
		return this._employees
	}
}