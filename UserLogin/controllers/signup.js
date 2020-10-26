const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports.signup_get = (req, res, next) => {
    res.render('pages/user-signup');
    res.status(200);
};

module.exports.signup_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
            return res.status(400);

        let user = new User({
            email: req.body.email,
            password: hash
        });

        user.save((err) => {
            if (err) {
                let error = "Something bad happened! Please try again";

                if (err.code === 11000) {
                    error = "That email is already taken, please try another";
                }

                return res.render("pages/user-signup", { error: error });
            }

            req.session.loggedIn = true;
            res.redirect("/dashboard");
        });
    });
};