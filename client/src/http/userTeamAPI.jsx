import {$authHost} from "./index";

export const fetchTeams = async () => {
	const {data} = await $authHost.get('api/teams')
	return data
}

export const fetchUsers = async () => {
	const {data} = await $authHost.get('api/user')
	return data
}

export const fetchRoles = async () => {
	const {data} = await $authHost.get('api/role')
	return data
}

export const fetchQualifications = async () => {
	const {data} = await $authHost.get('api/qualification')
	return data
}

export const createUserTeam = async (userId, teamId, roleId, qualificationId) => {
	const {data} = await $authHost.post('api/user-team', {userId, teamId, roleId, qualificationId})
	return data
}

export const fetchUserTeams = async () => {
	const {data} = await $authHost.get('api/user-team')
	return data
}