import React, {useEffect} from 'react';
import {useStateContext} from "../contexts/ContextProvider";
import {fetchUsers, fetchTasks, fetchUserTasks} from "../http/userTaskAPI";
import {observer} from "mobx-react-lite";

const UserTask = observer(({id}) => {
	const {userTask} = useStateContext();

	useEffect(() => {
		fetchUsers().then(data => userTask.setUsers(data))
		fetchTasks().then(data => userTask.setTasks(data))
		fetchUserTasks().then(data => userTask.setUserTasks(data))
	}, [userTask.selectedTask, userTask.selectedUser])

	return (
		<div className="rounded-lg overflow-hidden w-full h-full flex justify-center items-center">
			<table className="h-full w-full text-center text-sm">
				<thead
					className="h-[3rem] w-full md:w-3/4 bg-slate-300 dark:bg-gray-600 p-4 text-center text-dark-gray dark:text-gray-200">
				<tr>
					<th>ФИО</th>
					<th>Дата начала работ</th>
					<th>Дата окончания работ</th>
				</tr>
				</thead>
				<tbody
					className="w-full md:w-1/4 bg-light-gray dark:bg-gray-500 p-4 text-center text-gray-700 dark:text-gray-300 divide-y divide-slate-300 dark:divide-gray-600">
				{userTask.userTasks.map(userTask => {
						if (userTask.taskId === id) {
							return (
								<React.Fragment key={userTask.id}>
									<tr
										className="hover:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
										<td className="min-w-[2rem]">
											<div
												className="my-1">
												{`${userTask.user.secondName} ${userTask.user.firstName} ${userTask.user.patronymic}`}
											</div>
										</td>
										<td className="min-w-[2rem]">
											{userTask.startWork && (
												<div
													className="my-1">
													{userTask.startWork}
												</div>
											)}
										</td>
										<td className="min-w-[2rem]">
											{userTask.finishWork && (
												<div
													className="my-1">
													{userTask.finishWork}
												</div>
											)}
										</td>
									</tr>
								</React.Fragment>
							);
						}
					}
				)}
				</tbody>
			</table>
		</div>

	);
});

export default UserTask;