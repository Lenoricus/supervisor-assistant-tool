import React, {useEffect, useState} from 'react';
import {Button, Header} from '../components';
import {useStateContext} from "../contexts/ContextProvider";
import {useNavigate} from "react-router-dom"
import {TASKS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import CreateTask from "../components/modals/CreateTask";
import {fetchTasks, fetchStatuses, fetchProjects} from "../http/tasksAPI";

const Tasks = observer(() => {
	const {task, currentColor} = useStateContext()
	const navigate = useNavigate()
	const [taskVisible, setTaskVisible] = useState(false)

	useEffect(() => {
		fetchTasks().then(data => task.setTasks(data.rows))
		fetchStatuses().then(data => task.setStatuses(data))
		fetchProjects().then(data => task.setProjects(data))
	}, [taskVisible, task.selectedProject, task.selectedStatus]);

	return (
		<div
			className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
			<Header category="Страница" title="Задачи"/>
			<div className="rounded-lg overflow-hidden w-full h-full flex justify-center items-center overflow-x-auto">
				<table className="h-full w-full text-center text-sm">
					<thead
						className="h-[3rem] w-full md:w-3/4 bg-slate-300 dark:bg-gray-600 p-4 text-center text-dark-gray dark:text-gray-200">
					<tr>
						<th>ID</th>
						<th>Проект</th>
						<th>Название</th>
						<th>Статус</th>
						<th>Дата начала</th>
						<th className="max-w-[5rem]">Оценка трудозатрат</th>
						<th>Трудозатраты</th>
					</tr>
					</thead>
					<tbody className="w-full md:w-1/4 bg-light-gray dark:bg-gray-500 p-4 text-center text-gray-700 dark:text-gray-300 divide-y divide-slate-300 dark:divide-gray-600">
					{task.tasks.map(task => (
						<tr key={task.id} onClick={() => navigate(TASKS_ROUTE + '/' + task.id)}
							className="hover:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
							<td className="min-w-[2rem]">
								<div
									className="my-1">
									{task.id}
								</div>
							</td>
							<td className="max-w-[10rem] min-w-[5rem] text-start pl-4">
								{task.project && (
									<div className="my-1 overflow-hidden whitespace-nowrap text-ellipsis">
										{task.project.title}
									</div>
								)}
							</td>
							<td className="max-w-[20rem] min-w-[15rem] text-start pl-4">
								<div
									className="my-1 overflow-hidden whitespace-nowrap text-ellipsis">
									{task.title}
								</div>
							</td>
							<td>
								<div
									className="my-1">
									{task.status.title}
								</div>
								{/*{task.statuses.map(status => (*/}
								{/*<div key={status.id}>*/}
								{/*	{status.title}*/}
								{/*</div>*/}
								{/*))}*/}
							</td>
							<td>
								<div
									className="my-1">
									{task.startDate}
								</div>

							</td>
							<td>
								<div
									className="my-1">
									{task.planned}
								</div>
							</td>
							<td>
								<div
									className="my-1">
									{task.spent}
								</div>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
			<div className="mt-5 w-fit" onClick={() => setTaskVisible(true)}>
				<Button
					color="white"
					bgColor={currentColor}
					text="Создать"
					borderRadius="10px"
					width="100px"
				/>
			</div>
			<CreateTask show={taskVisible} onHide={() => setTaskVisible(false)}/>
		</div>
	);
});
export default Tasks;
