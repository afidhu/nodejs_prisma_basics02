const router = require('express').Router();
const usercontroller =require('../controllers/userController')


router.get('/',usercontroller.getUsers)
router.post('/',usercontroller.createUser)

module.exports = router;