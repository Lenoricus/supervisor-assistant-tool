import React, {useEffect, useState} from 'react';
import {Button, Header} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import {useNavigate, useParams} from 'react-router-dom';
import {deleteProject, fetchOneProject, updateProject} from "../http/projectAPI";
import {PROJECT_ROUTE} from "../utils/consts";
import UpdateProject from "../components/modals/UpdateProject";
import {observer} from "mobx-react-lite";
import DeleteProject from "../components/modals/DeleteProject";

const ProjectPage = observer(() => {
	const {project, currentColor} = useStateContext();
	const [oneProject, setOneProject] = useState('');
	const [updProjectVisible, setUpdProjectVisible] = useState(false);
	const [delProjectVisible, setDelProjectVisible] = useState(false);
	const {id} = useParams()

	useEffect(() => {
		fetchOneProject(id).then(data => setOneProject(data)) // не обновляется при нажатии, потому что id один и тот же
	}, [updProjectVisible, project.selectedTeam])

	return (
		<div
			className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
			{project.projects.map(project => {
				if (oneProject && project.id === oneProject.id) {
					return (
						<React.Fragment key={project.id}>
							<Header category="Проект" title={project.title + ' #' + project.id}/>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Дата начала:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{project.startDate}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Команда:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{project.team.title}
								</p>
							</div>
							<div className="flex gap-4">
								<h2 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">
									Описание:
								</h2>
								<p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
									{project.description}
								</p>
							</div>
						</React.Fragment>
					);
				}
			})}
			<div className="flex space-x-4 justify-end">
				<div onClick={() => setUpdProjectVisible(true)}>
					<Button
						color="white"
						bgColor={currentColor}
						text="Изменить"
						borderRadius="10px"
						width="100px"
					/>
				</div>
				<div onClick={() => setDelProjectVisible(true)}>
					<Button
						color="white"
						bgColor={currentColor}
						text="Удалить"
						borderRadius="10px"
						width="100px"
					/>
				</div>
			</div>
			<DeleteProject show={delProjectVisible} onHide={() => setDelProjectVisible(false)}/>
			<UpdateProject show={updProjectVisible} onHide={() => setUpdProjectVisible(false)}/>
		</div>
	);
});

export default ProjectPage;