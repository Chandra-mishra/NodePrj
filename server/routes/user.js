const router = require('express').Router();
const user = require('../controller/user');
const multer = require('multer');
const auth = require('../middleware/auth');

const upload = multer();



router.route('/')
.post(upload.single('user'),user.add)

router.route('/list/:start/:length')
.get(auth,user.listAll);

router.route('/jobtitle')
.get(auth,user.getUser);

router.route('/login')
.post(user.login);

module.exports = router;