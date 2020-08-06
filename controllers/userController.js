const User = require("../models/user");
const bcrypt = require("bcryptjs");

// exports.login = "";

// handle user sign up on GET
exports.signup_get = (req, res) => {
    res.render('signup_form', { title: 'Sign up now!' });
};

//  handle user sign up on POST
exports.signup_post = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.firstname,
        last_name: req.body.lastname
    });

    bcrypt.hash(user.password, 10, (err, hashedPassWord) => {
        if (err) next(err);
        user.password = hashedPassWord;
        user.save((err) => {
            if (err) next(err);
            res.redirect("/");
        });
    });
};
