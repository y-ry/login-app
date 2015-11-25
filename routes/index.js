'use strict';

var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//ログインバリデート
var loginCheck = function(req, res, next) {
        
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');
    }
};

router.get('/', loginCheck, function(req, res) {
        console.log('req.session2',req.session);
    res.render('index', { user: req.session.user});
    
});
/*
router.get('/', 
    function(req,res,next){
        console.log('req.session.user3',req.session.user);
        console.log('req.session3',req.session);
        // console.log('req',req);
        if(req.session.user){
            console.log('loginからnextへ3');
            next();
        }else{
            console.log('loginへ3');
            res.redirect('/login');
        }
    
    }, function(req, res) {
        console.log('req.session3',req.session);
        res.render('index', { user: req.session.user});
});
*/
module.exports = router;
