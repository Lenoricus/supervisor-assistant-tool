import React, {useEffect, useState} from 'react';
import {Button, Header, UserTask} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import {useParams} from 'react-router-dom';
import {fetchOneTask} from "../http/tasksAPI";
import CreateUserTask from "../components/modals/CreateUserTask";

const TaskPage = () => {
	const {task, currentColor} = useStateContext();
	const [oneTask, setOneTask] = useState('');
	const {id} = useParams()
	const [userTaskVisible, setUserTaskVisible] = useState(false)

	useEffect(() => {
		fetchOneTask(id).then(data => setOneTask(data))
	}, [])

	return (
		<div
			className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
			{task.tasks.map(task => {
				if (task.id === oneTask.id) {
					return (
						<React.Fragment key={task.id}>
							<Header category="Задача" title={task.title + ' #' + task.id}/>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Проект:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{task.project.title}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Статус задачи:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{task.status.title}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Дата начала:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{task.startDate}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Оценка трудозатрат:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{task.planned}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Трудозатраты:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{task.spent}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Описание:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{task.description}
								</p>
							</div>
						</React.Fragment>
					);
				}
			})}
			<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
				Исполнители:
			</h2>
			<UserTask id={oneTask.id}/>
			<div className="flex space-x-4 justify-end mt-4">
				<div className="w-fit" onClick={() => setUserTaskVisible(true)}>
					<Button
						color="white"
						bgColor={currentColor}
						text="Добавить исполнителя"
						borderRadius="10px"
						width="100px"
					/>
				</div>
				<div>
					<Button
						color="white"
						bgColor={currentColor}
						text="Изменить"
						borderRadius="10px"
						width="100px"
					/>
				</div>
				<div>
					<Button
						color="white"
						bgColor={currentColor}
						text="Удалить"
						borderRadius="10px"
						width="100px"
					/>
				</div>
			</div>
			<CreateUserTask show={userTaskVisible} onHide={() => setUserTaskVisible(false)}/>
		</div>
	);
};

export default TaskPage;