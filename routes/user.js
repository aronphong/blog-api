var express = require('express');
var router = express.Router();

// require controller modules
const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// GET user log in page
router.get('/login', user_controller.login_get);

// POST user log in 
router.post('/login', user_controller.login_post);

// GET user sign up page
router.get('/sign-up', user_controller.signup_get);

// POST user sign up
router.post('/sign-up', user_controller.signup_post)

module.exports = router;
