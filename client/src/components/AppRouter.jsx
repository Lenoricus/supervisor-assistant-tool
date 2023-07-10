import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE, PROJECT_ROUTE} from "../utils/consts";
import {useStateContext} from "../contexts/ContextProvider";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
	const {user} = useStateContext()

	return (
		<Routes>
			{user.isAuth && authRoutes.map(({path, Component}) =>
				<Route key={path} path={path} element={<Component/>} exact/>
			)}
			{publicRoutes.map(({path, Component}) =>
				<Route key={path} path={path} element={<Component/>} exact/>
			)}

			{!user.isAuth
				? <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />
				: <Route path='*' element={<Navigate to={PROJECT_ROUTE}/>} />
			}
		</Routes>
	);
});

export default AppRouter;