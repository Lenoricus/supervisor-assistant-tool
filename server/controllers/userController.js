const uuid = require('uuid')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {User, Team} = require("../models/models");

const generateJwt = (id, email, access_rights) => {
    return jwt.sign(
        {id, email, access_rights},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

const ApiError = require('../error/ApiError')
class UserController {
    async registration(req, res, next){
        const {email, password, access_rights, secondName, firstName, patronymic} = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        // const {avatar} = req.files
        // let fileName = uuid.v4() + ".jpg"
        // avatar.mv(path.resolve(__dirname, '..', 'static', fileName))

        const candidate = await User.findOne({where:{email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, access_rights, password: hashPassword, secondName, firstName, patronymic})
        const token = generateJwt(user.id, user.email, user.access_rights)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.access_rights)
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.access_rights)
        return res.json({token})
    }

    async getAll(req, res) {
        const employees = await User.findAll({order: [['secondName', 'ASC']]})
        return res.json(employees)
    }

    async getOne(req, res){
        const {id} = req.params
        const employee = await User.findOne(
            {
                where:{id}
            },
        )
        return res.json(employee)
    }
}

module.exports = new UserController()