import React, {useEffect, useState} from 'react';
import {Button, Header, UserTeam} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import {useParams} from 'react-router-dom';
import {fetchOneTeam} from "../http/teamAPI";
import CreateUserTeam from "../components/modals/CreateUserTeam";

const TeamPage = () => {
	const {team, currentColor} = useStateContext();
	const [oneTeam, setOneTeam] = useState('');
	const {id} = useParams()
	const [userTeamVisible, setUserTeamVisible] = useState(false)

	useEffect(() => {
		fetchOneTeam(id).then(data => setOneTeam(data))
	}, [])

	return (
		<div
			className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
			{team.teams.map(team => {
				if (team.id === oneTeam.id) {
					return (
						<React.Fragment key={team.id}>
							<Header category="Команда" title={team.title}/>
						</React.Fragment>
					);
				}
			})}
			<UserTeam id={oneTeam.id} />
			<div className="flex space-x-4 justify-end mt-4">
				<div className="w-fit" onClick={() => setUserTeamVisible(true)}>
					<Button
						color="white"
						bgColor={currentColor}
						text="Добавить участника"
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
			<CreateUserTeam show={userTeamVisible} onHide={() => setUserTeamVisible(false)}/>
		</div>
	)
};

export default TeamPage;