import {
	ADMIN_ROUTE,
	EMPLOYEES_ROUTE,
	PROJECT_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	TASKS_ROUTE,
	TEAMS_ROUTE
} from './utils/consts';
import {Employees, Project, Teams, Tasks, Admin, Auth, TaskPage, TeamPage, EmployeePage, ProjectPage} from './pages';

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin
	},
	{
		path: TASKS_ROUTE + '/:id',
		Component: TaskPage
	},
	{
		path: TASKS_ROUTE,
		Component: Tasks
	},
	{
		path: PROJECT_ROUTE,
		Component: Project
	},
	{
		path: PROJECT_ROUTE + '/:id',
		Component: ProjectPage
	},
	{
		path: EMPLOYEES_ROUTE,
		Component: Employees
	},
	{
		path: EMPLOYEES_ROUTE + '/:id',
		Component: EmployeePage
	},
	{
		path: TEAMS_ROUTE,
		Component: Teams
	},
	{
		path: TEAMS_ROUTE + '/:id',
		Component: TeamPage
	},
];

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Auth
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth
	},
]