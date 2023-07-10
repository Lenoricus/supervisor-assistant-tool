import React, {useState} from 'react';
import {Button, Header} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {PROJECT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
	const {user, currentColor} = useStateContext();

	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [secondName, setSecondName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [patronymic, setPatronymic] = useState('')

	const divStyle = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const isLoginClick = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password)
			} else {
				data = await registration(email, password, secondName, firstName, patronymic)
			}
			user.setUser(user)
			user.setIsAuth(true)
			// localStorage.setItem('isAuthorized', true)
			// console.log(user)
			navigate(PROJECT_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	return (
		<div style={divStyle}>
			<div
				className="min-w-fit w-5/6 md:w-1/4 p-5 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl drop-shadow-xl">
				<Header category="" title={isLogin ? "Авторизация" : "Регистрация"}/>
				<form className="w-full">
					{isLogin
						? <div>
							<div className="relative z-0 w-full mb-6 group">
								<input type="email" name="floating_email" id="floating_email"
									   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									   placeholder=" " required value={email}
									   onChange={e => setEmail(e.target.value)}/>
								<label htmlFor="floating_email"
									   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Email</label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input type="password" name="floating_password" id="floating_password"
									   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									   placeholder=" " required value={password}
									   onChange={e => setPassword(e.target.value)}/>
								<label htmlFor="floating_password"
									   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Пароль</label>
							</div>
						</div>
						: <div>
							<div className="relative z-0 w-full mb-6 group">
								<input type="email" name="floating_email" id="floating_email"
									   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									   placeholder=" " required value={email}
									   onChange={e => setEmail(e.target.value)}/>
								<label htmlFor="floating_email"
									   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Email</label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input type="password" name="floating_password" id="floating_password"
									   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									   placeholder=" " required value={password}
									   onChange={e => setPassword(e.target.value)}/>
								<label htmlFor="floating_password"
									   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Пароль</label>
							</div>
							<div className="grid md:grid-cols-2 md:gap-6">
								<div className="relative z-0 w-full mb-6 group">
									<input type="text" name="floating_last_name" id="floating_last_name"
										   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										   placeholder=" " required value={secondName}
										   onChange={e => setSecondName(e.target.value)}/>
									<label htmlFor="floating_last_name"
										   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Фамилия</label>
								</div>
								<div className="relative z-0 w-full mb-6 group">
									<input type="text" name="floating_first_name" id="floating_first_name"
										   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										   placeholder=" " required value={firstName}
										   onChange={e => setFirstName(e.target.value)}/>
									<label htmlFor="floating_first_name"
										   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
										Имя</label>
								</div>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input type="text" name="patronymic" id="patronymic"
									   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									   placeholder=" " required value={patronymic}
									   onChange={e => setPatronymic(e.target.value)}/>
								<label htmlFor="patronymic"
									   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Отчество</label>
							</div>
						</div>
					}
					<div className="md:flex md:items-center mb-3">
						<div className="w-full">
							{isLogin ?
								<div onClick={isLoginClick}>
									<Button
										color="white"
										bgColor={currentColor}
										text="Войти"
										borderRadius="10px"
										width="full"
									/>
								</div>
								:
								<div onClick={isLoginClick}>
									<Button
										color="white"
										bgColor={currentColor}
										text="Зарегестрироваться"
										borderRadius="10px"
										width="full"
									/>
								</div>
							}
						</div>
					</div>
					<div className="text-right">
						<label className="text-gray-500 font-bold">
							{isLogin ?
								<span className="text-sm">
        					Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> <span
									className={"text-blue-500"}>Регистрация</span></NavLink>
      						</span>
								:
								<span className="text-sm">
        					Уже зарегестрированы? <NavLink to={LOGIN_ROUTE}> <span
									className={"text-blue-500"}>Войти</span></NavLink>
      						</span>
							}
						</label>
					</div>
				</form>
			</div>
		</div>
	);
});

export default Auth;