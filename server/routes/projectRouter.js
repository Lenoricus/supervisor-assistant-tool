const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projectController')
const checkAccessRightsMiddleware = require('../middleware/checkAccessRightsMiddleware')

router.post('/', checkAccessRightsMiddleware('ADMIN'), projectController.create)
router.get('/', projectController.getAll)
router.get('/:id', projectController.getOne)
router.delete('/:id', projectController.delete)
router.put('/:id', projectController.update)

module.exports = router