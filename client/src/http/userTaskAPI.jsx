import {$authHost} from "./index";

export const fetchTasks = async () => {
	const {data} = await $authHost.get('api/tasks')
	return data
}

export const fetchUsers = async () => {
	const {data} = await $authHost.get('api/user')
	return data
}

export const createUserTask = async (startWork, finishWork, userId, taskId) => {
	const {data} = await $authHost.post('api/user-task', {startWork, finishWork, userId, taskId})
	return data
}

export const fetchUserTasks = async () => {
	const {data} = await $authHost.get('api/user-task')
	return data
}