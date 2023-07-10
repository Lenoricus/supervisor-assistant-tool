import React, {useEffect, useState} from 'react';

import {Button, Header} from '../components';
import {useStateContext} from "../contexts/ContextProvider";
import {fetchTeams} from "../http/teamAPI";
import {observer} from "mobx-react-lite";
import {TEAMS_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import CreateTeam from "../components/modals/CreateTeam"

const Teams = observer(() => {
	const {team, currentColor} = useStateContext()
	const navigate = useNavigate()
	const [teamVisible, setTeamVisible] = useState(false)

	useEffect(() => {
		fetchTeams().then(data => team.setTeams(data))
	}, [teamVisible]);

	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl drop-shadow-xl">
			<Header category="Страница" title="Команды"/>
            <div className="rounded-lg overflow-hidden w-full h-full flex justify-center items-center overflow-x-auto">
                <table className="h-full w-full text-center text-sm">
                    <thead
                        className="h-[3rem] w-full md:w-3/4 bg-slate-300 dark:bg-gray-600 p-4 text-center text-dark-gray dark:text-gray-200">
                    <tr>
                        <th>Название</th>
                    </tr>
                    </thead>
                    <tbody className="w-full md:w-1/4 bg-light-gray dark:bg-gray-500 p-4 text-center text-gray-700 dark:text-gray-300 divide-y divide-slate-300 dark:divide-gray-600">
                    {team.teams.map(team => (
                        <tr key={team.id} onClick={() => navigate(TEAMS_ROUTE + '/' + team.id)}
                            className="hover:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
							<td>
								<div
									className="my-1 overflow-hidden whitespace-nowrap text-ellipsis text-start pl-4">
									{team.title}
								</div>
							</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
			<div className="mt-5 w-fit" onClick={() => setTeamVisible(true)}>
				<Button
					color="white"
					bgColor={currentColor}
					text="Создать"
					borderRadius="10px"
					width="100px"
				/>
			</div>
			<CreateTeam show={teamVisible} onHide={() => setTeamVisible(false)}/>
		</div>
	);
});
export default Teams;
