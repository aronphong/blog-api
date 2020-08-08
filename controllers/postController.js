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