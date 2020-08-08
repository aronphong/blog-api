const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");
require('../config/passport');

// handle user login on GET
exports.login_get = (req, res) => {
    res.render('login_form', { title: 'Sign up now! '});
};

// handle user login on POST
exports.login_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/user/login"
});

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

exports.logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
}
