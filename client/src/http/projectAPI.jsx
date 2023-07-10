import {$authHost} from "./index";

export const fetchTeams = async () => {
	const {data} = await $authHost.get('api/teams')
	return data
}

export const createProject = async (title, startDate, description, teamId) => {
	const {data} = await $authHost.post('api/projects', {title, startDate, description, teamId})
	return data
}

export const fetchProjects = async () => {
	const {data} = await $authHost.get('api/projects')
	return data
}

export const fetchOneProject = async (id) => {
	const {data} = await $authHost.get('api/projects/' + id)
	return data
}

export const deleteProject = async (id) => {
	const {data} = await $authHost.delete('api/projects/' + id)
	return data
}

export const updateProject = async (newTitle, newStartDate, newDescription, newTeamId, id) => {
	const {data} = await $authHost.put('api/projects/' + id, {
		title: newTitle,
		startDate: newStartDate,
		description: newDescription,
		teamId: newTeamId,
	})
	return data
}