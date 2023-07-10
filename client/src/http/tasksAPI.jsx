import {$authHost} from "./index";

export const fetchStatuses = async () => {
	const {data} = await $authHost.get('api/status')
	return data
}

export const fetchProjects = async () => {
	const {data} = await $authHost.get('api/projects')
	return data
}

export const createTask = async (title, startDate, planned, projectId, statusId, description) => {
	const {data} = await $authHost.post('api/tasks', {title, startDate, planned, projectId, statusId, description})
	return data
}

export const fetchTasks = async () => {
	const {data} = await $authHost.get('api/tasks')
	return data
}

export const fetchOneTask = async (id) => {
	const {data} = await $authHost.get('api/tasks/' + id)
	return data
}