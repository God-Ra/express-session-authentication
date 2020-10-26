const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const checkPassword = (bodyPassword, hashedPassword) => {
    bcrypt.compare(bodyPassword, hashedPassword, (err, result) => {
        if (err)
            return false;

        return result;
    });
};

module.exports.login_get = (req, res, next) => {
    res.render('pages/user-login');
    res.status(200);
};

module.exports.login_post = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user || checkPassword(req.body.password, user.password) === false) {
            return res.render("pages/user-login", {
                error: "Incorrect email / password"
            });
        }

        req.session.loggedIn = true;
        res.redirect('/dashboard');
    });
};