'use strict';

var express = require('express');
var router = express.Router();
var model = require('../model.js');
var User = model.User;

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var query = {
        "email": email,
        //"password": password
    };
    User.find(query, function(err, data) {
        if (err) {
            console.log('erro---',err);
        }
        if (data === "") {
            console.log('データなし');
            res.render('login');
        } else {
            console.log('データあり');
            req.session.user = email;
            req.session.save(function(){ 
                // res.send('{}')
                res.redirect('/');
            });
            // res.redirect('/');
        }
    });
});

module.exports = router;