import React from 'react';
import {MdOutlineCancel} from 'react-icons/md';

import {Button} from './index';
import {userProfileData} from '../data/dummy';
import {useStateContext} from '../contexts/ContextProvider';
import avatar3 from '../data/avatar3.png';
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const UserProfile = observer(() => {
	const {setIsClicked, initialState, user, currentColor} = useStateContext();
	const navigate = useNavigate();

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		// localStorage.setItem('isAuthorized', false)

		navigate(LOGIN_ROUTE)
		console.log(user)
	}

	return (
		<div
			className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 border-1 border-color">
			<div className="flex justify-between items-center">
				<p className="font-semibold text-lg dark:text-gray-200">Профиль</p>
				<div onClick={() => setIsClicked(initialState)}>
					<Button
						icon={<MdOutlineCancel/>}
						color="rgb(153, 171, 180)"
						bgHoverColor="light-gray"
						size="2xl"
						borderRadius="50%"
					/>
				</div>
			</div>
			<div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
				<img
					className="rounded-full h-24 w-24"
					src={avatar3}
					alt="user-profile"
				/>
				<div className="overflow-hidden">
					<p className="font-semibold text-xl dark:text-gray-200"> Елена Барабанщикова </p>
					<p className="text-gray-500 text-sm dark:text-gray-400"> Разработчик </p>
					<p className="text-gray-500 text-sm font-semibold dark:text-gray-400 truncate "> e.barabanshchikova@g.nsu.ru </p>
				</div>
			</div>
			<div>
				{userProfileData.map((item, index) => (
					<div key={index}
						 className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
						<button
							type="button"
							style={{color: item.iconColor, backgroundColor: item.iconBg}}
							className=" text-xl rounded-lg p-3 hover:bg-light-gray"
						>
							{item.icon}
						</button>

						<div>
							<p className="font-semibold dark:text-gray-200 ">{item.title}</p>
							<p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
						</div>
					</div>
				))}
			</div>
			<div className="mt-5" onClick={logOut}>
				<Button
					color="white"
					bgColor={currentColor}
					text="Выйти"
					borderRadius="10px"
					width="full"
				/>
			</div>
		</div>
	);
});

export default UserProfile;
