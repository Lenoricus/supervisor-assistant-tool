import React, {createContext, useContext, useState} from 'react';
import UserPrototype from "../prototype/UserPrototype";
import TaskPrototype from "../prototype/TaskPrototype";
import TeamPrototype from "../prototype/TeamPrototype";
import UserTeamPrototype from "../prototype/UserTeamPrototype";
import ProjectPrototype from "../prototype/ProjectPrototype"
import UserTaskPrototype from "../prototype/UserTaskPrototype";

const StateContext = createContext();

const initialState = {
	chat: false,
	userProfile: false,
	notification: false,
};
export const ContextProvider = ({children}) => {
	const [screenSize, setScreenSize] = useState(undefined);
	const [currentColor, setCurrentColor] = useState('#03C9D7');
	const [currentMode, setCurrentMode] = useState('Light');
	const [themeSettings, setThemeSettings] = useState(false);
	const [activeMenu, setActiveMenu] = useState(false);
	const [isClicked, setIsClicked] = useState(initialState);
	const [user, setUser] = useState(new UserPrototype());
	const [task, setTask] = useState(new TaskPrototype());
	const [team, setTeam] = useState(new TeamPrototype());
	const [project, setProject] = useState(new ProjectPrototype());
	const [userTeam, setUserTeam] = useState(new UserTeamPrototype());
	const [userTask, setUserTask] = useState(new UserTaskPrototype())

	const setMode = (e) => {
		setCurrentMode(e.target.value);
		localStorage.setItem('themeMode', e.target.value);
	};

	const setColor = (color) => {
		setCurrentColor(color);
		localStorage.setItem('colorMode', color);
	};

	const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

	return (
		<StateContext.Provider value={{
			currentColor,
			currentMode,
			activeMenu,
			screenSize,
			setScreenSize,
			handleClick,
			isClicked,
			initialState,
			setIsClicked,
			setActiveMenu,
			setCurrentColor,
			setCurrentMode,
			setMode,
			setColor,
			themeSettings,
			setThemeSettings,
			user,
			setUser,
			task,
			setTask,
			team,
			setTeam,
			project,
			setProject,
			userTeam,
			setUserTeam,
			userTask,
			setUserTask
		}}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
