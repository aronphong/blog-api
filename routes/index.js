var express = require('express');
var router = express.Router();

// require controller modules
const post_controller = require('../controllers/postController');

/* GET home page. */
router.get('/', post_controller.index);

module.exports = router;
