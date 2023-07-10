import {$authHost} from "./index";

// export const fetchUsers = async () => {
// 	const {data} = await $authHost.get('api/user')
// 	return data
// }

export const createTeam = async (title, userId) => {
	const {data} = await $authHost.post('api/teams', {title, userId})
	return data
}

export const fetchTeams = async () => {
	const {data} = await $authHost.get('api/teams')
	return data
}

export const fetchOneTeam = async (id) => {
	const {data} = await $authHost.get('api/teams/' + id)
	return data
}