const Router = require('express')
const router = new Router()
const userTeamController = require('../controllers/userTeamController')

router.post('/', userTeamController.create)
router.get('/', userTeamController.getAll)

module.exports = router