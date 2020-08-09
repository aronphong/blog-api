const Post = require('../models/post');
require('../config/passport');

const async = require('async');

exports.index = (req, res) => {

    async.parallel({
        post_count: (callback) => {
            Post.countDocuments({}, callback)
        }
    }, (err, results) => {

        res.render('index', { title: 'Blog API Home', error: err, data: results, user: req.user });
    }
    )
}

exports.blog_posts = (req, res, next) => {

    Post.find({})
        .exec((err, list_posts) => {
            if (err) next(err);
            res.render('blog_posts', {title: 'Blog Posts', blog_list: list_posts });
        });
}

// display create blog post form on GET
exports.newpost_create_get = (req, res) => {

    res.render('newpost_form', { title: 'Create new blog post' });
};

// handle create blog post on POST
exports.newpost_create_post = (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        date: new Date(Date.now()).toDateString(),
        author: req.user.id,
        published: false
    });

    post.save((err) => {
        if (err) next(err);

        // successful - redirect to new post url
        res.redirect(post.url);
    })
}
