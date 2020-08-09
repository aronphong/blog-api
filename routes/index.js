var express = require('express');
var router = express.Router();

// require controller modules
const post_controller = require('../controllers/postController');

/* GET home page. */
router.get('/', post_controller.index);

// GET blog posts
router.get('/blog/posts', post_controller.blog_posts);

// GET blog post crete
router.get('/blog/post/create', post_controller.newpost_create_get);

// POST blog post create
router.post('/blog/post/create', post_controller.newpost_create_post);


module.exports = router;
