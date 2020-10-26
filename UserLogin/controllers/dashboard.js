const express = require('express');

module.exports.check_auth = (req, res, next) => {
    if (req.session.loggedIn === true) {
        next();
    }
    else {
        res.redirect('/login');
        res.status(401);
    }
}

module.exports.dashboard_show = (req, res, next) => {
    res.render('pages/user-dashboard');
    res.status(200);
}