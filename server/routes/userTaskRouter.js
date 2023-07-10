const Router = require('express')
const router = new Router()
const userTaskController = require('../controllers/userTaskController')

router.post('/', userTaskController.create)
router.get('/', userTaskController.getAll)

module.exports = router