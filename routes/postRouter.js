const router = require('express').Router();
const postcontroller =require('../controllers/postController')

router.get('/',postcontroller.getPosts)
router.post('/',postcontroller.createPosts)


module.exports = router;