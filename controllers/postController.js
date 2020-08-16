const Post = require('../models/post');
const User = require('../models/user');

require('../config/passport');

const async = require('async');

exports.index = (req, res) => {

    Post.find({})
    .exec((err, list_posts) => {
        if (err) next(err);
        res.render('blog_posts', { title: 'Blog Posts', blog_list: list_posts, user: req.user });
    });
}

// display blog posts on GET
exports.blog_posts = (req, res, next) => {

    Post.find({})
        .exec((err, list_posts) => {
            if (err) next(err);
            res.render('blog_posts', { title: 'Blog Posts', blog_list: list_posts, user: req.user });
        });
}

// display blog post detail on GET
exports.blog_posts_detail_get = (req, res, next) => {

    Post.findById(req.params.id)
        .populate('author')
        .exec((err, blog_post) => {

            if (err) next(err);
            res.render('blog_post_detail', { title: blog_post.postTitle, blog_post: blog_post, user: req.user });
        })
}

// handle blog post detail on POST
exports.blog_post_detail_post = (req, res, next) => {

    const newComment = {
        commenter: req.user,
        text: req.body.newComment,
        date: new Date(Date.now()).toDateString()
    };


    Post.findById(req.params.id)
        .exec((err, blog_post) => {

            blog_post.comments.push(newComment)
            blog_post.save((err) => {
                if (err) next(err);

                // successful - redirect to post
                res.redirect(blog_post.url);
            })
        });
}

// display create blog post form on GET
exports.newpost_create_get = (req, res) => {

    res.render('newpost_form', { title: 'Create new blog post', user: req.user });
};

// handle create blog post on POST
exports.newpost_create_post = (req, res, next) => {

    const post = new Post({
        postTitle: req.body.postTitle,
        text: req.body.text,
        date: new Date(Date.now()).toDateString(),
        author: req.user,
        published: false
    });

    post.save((err) => {
        if (err) next(err);

        // successful - redirect to new post url
        res.redirect(post.url);
    })
}
