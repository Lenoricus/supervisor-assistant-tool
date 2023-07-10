const sequelize = require('../db')
const {DataTypes} = require('sequelize')

/* Во всех полях описания (description) необходимо увеличить кол-во допустимых символов, 255 (по умолчанию) очень мало! */

const User = sequelize.define('user', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		secondName: {type: DataTypes.STRING},
		firstName: {type: DataTypes.STRING},
		patronymic: {type: DataTypes.STRING},
		email: {type: DataTypes.STRING, unique: true},
		password: {type: DataTypes.STRING},
		access_rights: {type: DataTypes.STRING, defaultValue: "ADMIN"},
		avatar: {type: DataTypes.STRING}
	},
	{timestamps: false})

const Project = sequelize.define('project', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING},
		startDate: {type: DataTypes.DATEONLY},
		description: {type: DataTypes.STRING},
	},
	{timestamps: false})

const Task = sequelize.define('task', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING},
		startDate: {type: DataTypes.DATEONLY},
		planned: {type: DataTypes.INTEGER},
		spent: {type: DataTypes.INTEGER},
		description: {type: DataTypes.STRING},
	},
	{timestamps: false})

const Team = sequelize.define('team', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING},
	},
	{timestamps: false})

const Status = sequelize.define('status', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING},
	},
	{timestamps: false})

const Role = sequelize.define('role', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING},
	},
	{timestamps: false})

const Qualification = sequelize.define('qualification', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING},
	},
	{timestamps: false})

const UserTeams = sequelize.define('user_teams', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{timestamps: false})

const UserTasks = sequelize.define('user_tasks', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		startWork: {type: DataTypes.DATEONLY},
		finishWork: {type: DataTypes.DATEONLY},
	},
	{timestamps: false})

Status.hasMany(Task)
Task.belongsTo(Status)

Project.hasMany(Task, { onDelete: 'CASCADE', hooks: true })
Task.belongsTo(Project)

Team.hasMany(Project)
Project.belongsTo(Team)

User.belongsToMany(Task, {through: UserTasks})
Task.belongsToMany(User, {through: UserTasks})
UserTasks.belongsTo(User)
UserTasks.belongsTo(Task)

User.belongsToMany(Team, {through: UserTeams})
Team.belongsToMany(User, {through: UserTeams})
Role.hasMany(UserTeams)
UserTeams.belongsTo(Role)
Qualification.hasMany(UserTeams)
UserTeams.belongsTo(Qualification)
UserTeams.belongsTo(User)
UserTeams.belongsTo(Team)

module.exports = {
	User,
	Project,
	Task,
	Team,
	Status,
	Role,
	Qualification,
	UserTeams,
	UserTasks
}
