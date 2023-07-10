import React from 'react';
import {FiBriefcase, FiClipboard, FiUsers, FiUser, FiFileText} from 'react-icons/fi';
import {BsFillBriefcaseFill, BsFillEnvelopeFill, BsGearWideConnected} from 'react-icons/bs';
import avatar3 from './avatar3.png';

export const links = [
	// {
	// 	title: 'Главная',
	// 	links: [
	// 		{
	// 			name: 'project',
	// 			title: 'Описание',
	// 			icon: <FiBriefcase/>,
	// 		},
	// 	],
	// },

	{
		title: 'Страницы',
		links: [
			{
				name: 'tasks',
				title: 'Задачи',
				icon: <FiClipboard/>,
			},
			{
				name: 'employees',
				title: 'Сотрудники',
				icon: <FiUser/>,
			},
			{
				name: 'teams',
				title: 'Команды',
				icon: <FiUsers/>,
			},
		],
	},
	// {
	// 	title: 'Ссылки',
	// 	links: [
	// 		{
	// 			name: 'documentation',
	// 			title: 'Документация',
	// 			icon: <FiFileText/>,
	// 		},
	// 	],
	// },
];

export const chatData = [
	{
		image:
		avatar3,
		message: 'Получено новое сообщение',
		desc: 'Елена прислала Вам сообщение',
		time: '11:56',
	},
	{
		image:
		avatar3,
		message: 'Добавлена новая задача',
		desc: 'Проверьте список дел',
		time: '4:39',
	},
	{
		image:
		avatar3,
		message: 'Иванов И. И. завершил задачу #9090',
		desc: 'Назначьте ему новую!',
		time: '1:12',
	},
];

export const themeColors = [
	{
		name: 'blue-theme',
		color: '#1A97F5',
	},
	{
		name: 'green-theme',
		color: '#03C9D7',
	},
	{
		name: 'purple-theme',
		color: '#a47ad0',
	},
	{
		name: 'red-theme',
		color: '#FF5C8E',
	},
	{
		name: 'green-theme',
		color: '#478d43',
	},
	{
		color: '#FB9678',
		name: 'orange-theme',
	},
];

export const userProfileData = [
	{
		icon: <BsGearWideConnected/>,
		title: 'Профиль',
		desc: 'Настройки аккаунта',
		iconColor: '#03C9D7',
		iconBg: '#E5FAFB',
	},
	{
		icon: <BsFillEnvelopeFill/>,
		title: 'Почта',
		desc: 'Сообщения и рассылки',
		iconColor: 'rgb(0, 194, 146)',
		iconBg: 'rgb(235, 250, 242)',
	},
	{
		icon: <BsFillBriefcaseFill/>,
		title: 'Задачи',
		desc: 'Назначенные мне задачи',
		iconColor: 'rgb(255, 244, 229)',
		iconBg: 'rgb(254, 201, 15)',
	},
];