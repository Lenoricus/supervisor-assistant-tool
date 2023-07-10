import React, {useEffect, useState} from 'react';
import {Button, Header} from '../components';
import {useStateContext} from "../contexts/ContextProvider";
import {observer} from "mobx-react-lite";
import {fetchTeams, fetchProjects} from "../http/projectAPI";
import {PROJECT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import CreateProject from "../components/modals/CreateProject";

const Project = observer(() => {
    const {project, currentColor} = useStateContext()
    const navigate = useNavigate()
    const [projectVisible, setProjectVisible] = useState(false)

    useEffect(() => {
        fetchProjects().then(data => project.setProjects(data))
        fetchTeams().then(data => project.setTeams(data))
    }, [projectVisible, project.selectedTeam]);

    return (
        <div
            className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
            <Header category="Главная" title="Проекты"/>
            <div className="rounded-lg overflow-hidden w-full h-full flex justify-center items-center overflow-x-auto">
                <table className="h-full w-full text-center text-sm">
                    <thead
                        className="h-[3rem] w-full md:w-3/4 bg-slate-300 dark:bg-gray-600 p-4 text-center text-dark-gray dark:text-gray-200">
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Дата начала</th>
                        <th>Команда</th>
                    </tr>
                    </thead>
                    <tbody className="w-full md:w-1/4 bg-light-gray dark:bg-gray-500 p-4 text-center text-gray-700 dark:text-gray-300 divide-y divide-slate-300 dark:divide-gray-600">
                    {project.projects.map(project => (
                        <tr key={project.id} onClick={() => navigate(PROJECT_ROUTE + '/' + project.id)}
                            className="hover:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
                            <td className="min-w-[2rem]">
                                <div
                                    className="my-1">
                                    {project.id}
                                </div>
                            </td>
                            <td className="max-w-[10rem] min-w-[5rem] text-start pl-4">
                                <div className="my-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                    {project.title}
                                </div>
                            </td>
                            <td className="max-w-[20rem] min-w-[15rem]">
                                <div
                                    className="my-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                    {project.startDate}
                                </div>
                            </td>
                            <td>
                                <div
                                    className="my-1">
                                    {project.team.title}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-5 w-fit" onClick={() => setProjectVisible(true)}>
                <Button
                    color="white"
                    bgColor={currentColor}
                    text="Создать"
                    borderRadius="10px"
                    width="100px"
                />
            </div>
            <CreateProject show={projectVisible} onHide={() => setProjectVisible(false)}/>
        </div>
    );
});
export default Project;
