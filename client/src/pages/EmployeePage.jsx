import React, {useEffect, useState} from 'react';
import {GanttChart, Header} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import {useParams} from 'react-router-dom';
import {fetchOneUser} from "../http/userAPI";
import {fetchTasks, fetchUsers, fetchUserTasks} from "../http/userTaskAPI";

const EmployeePage = () => {
	const {user, userTask} = useStateContext();
	const [oneUser, setOneUser] = useState('');
	const {id} = useParams()

	useEffect(() => {
		fetchUsers().then(data => userTask.setUsers(data))
		fetchTasks().then(data => userTask.setTasks(data))
		fetchUserTasks().then(data => userTask.setUserTasks(data))
		fetchOneUser(id).then(data => setOneUser(data))
	}, [])

	const data = userTask.userTasks
		.filter((task) => task.userId === oneUser.id)
		.map((task) => ({
			title: task.task.title,
			start: task.startWork,
			end: task.finishWork,
		}));

	return (
		<div
			className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
			{user.employees.map(employee => {
				if (oneUser && employee.id === oneUser.id) {
					return (
						<React.Fragment key={employee.id}>
							<Header category="Сотрудник" title={employee.secondName + ' ' + employee.firstName + ' ' + employee.patronymic}/>
						</React.Fragment>
					);
				}
			})}
			<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
				Диаграмма занятости:
			</h2>
			<GanttChart
				data={data}
			/>
		</div>
	);
};

export default EmployeePage;