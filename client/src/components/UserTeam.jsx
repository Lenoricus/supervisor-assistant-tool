import React, {useEffect} from 'react';
import {useStateContext} from "../contexts/ContextProvider";
import {fetchQualifications, fetchRoles, fetchTeams, fetchUsers, fetchUserTeams} from "../http/userTeamAPI";
import {observer} from "mobx-react-lite";

const UserTeam = observer(({id}) => {
	const {userTeam} = useStateContext();

	useEffect(() => {
		fetchUserTeams().then(data => userTeam.setUserTeams(data))
		fetchTeams().then(data => userTeam.setTeams(data))
		fetchUsers().then(data => userTeam.setUsers(data))
		fetchRoles().then(data => userTeam.setRoles(data))
		fetchQualifications().then(data => userTeam.setQualifications(data))
	}, [userTeam.selectedTeam, userTeam.selectedUser, userTeam.selectedRole, userTeam.selectedQualification])

	return (
		<div className="rounded-lg overflow-hidden w-full h-full flex justify-center items-center">
			<table className="h-full w-full text-center text-sm">
				<thead
					className="h-[3rem] w-full md:w-3/4 bg-slate-300 dark:bg-gray-600 p-4 text-center text-dark-gray dark:text-gray-200">
				<tr>
					<th>ФИО</th>
					<th>Квалификация</th>
					<th>Роль</th>
				</tr>
				</thead>
				<tbody
					className="w-full md:w-1/4 bg-light-gray dark:bg-gray-500 p-4 text-center text-gray-700 dark:text-gray-300 divide-y divide-slate-300 dark:divide-gray-600">
				{userTeam.userTeams.map(userTeam => {
						if (userTeam.teamId === id) {
							return (
								<tr key={userTeam.id}
									className="hover:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
									<td className="min-w-[2rem]">
										<div
											className="my-1">
											{`${userTeam.user.secondName} ${userTeam.user.firstName} ${userTeam.user.patronymic}`}
										</div>
									</td>
									<td>
										<div
											className="my-1">
											{userTeam.qualification.title}
										</div>
									</td>
									<td>
										<div
											className="my-1">
											{userTeam.role.title}
										</div>
									</td>
								</tr>
							);
						}
					}
				)}
				</tbody>
			</table>
		</div>

	);
});

export default UserTeam;