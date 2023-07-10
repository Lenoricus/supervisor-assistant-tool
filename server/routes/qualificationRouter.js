const Router = require('express')
const router = new Router()
const qualificationController = require('../controllers/qualificationController')

router.post('/', qualificationController.create)
router.get('/', qualificationController.getAll)

module.exports = router