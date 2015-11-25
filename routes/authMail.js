'use strict';

var express = require('express');
var router = express.Router();
var model = require('../model.js');
var settings = require('../settings');
var fs = require("fs");
var User = model.User;
var calcDateDistance = require('../modules/calcDateDistance.js');

router.get('/', function(req, res) {
    res.redirect('/');
});
router.get('/auth', function(req, res) {
    //分岐深いな。。。
    if(typeof req.query !== 'undefined' && typeof req.query.auth !== 'undefined'){
        var fileObj = null,
        fileName = settings.common.newUserFileBasePath+'/'+ req.query.auth+ '.json';
        fs.readFile(fileName,function(err, data){
            if(err){
                console.log('ファイル読み込みerr',err);
            }else{
                fileObj = JSON.parse(data);
                console.log('aa--',fileObj,calcDateDistance);
                console.log('時間差',calcDateDistance.minuteDistance(new Date(fileObj.authed),new Date()) );
                if( settings.common.addingUserAllowMinute < calcDateDistance.minuteDistance(new Date(fileObj.authed),new Date()) ){
                    console.log('タイムアウト');
                    res.render('add',{err:'メールタイムアウト'});                    
                }else{
                    res.render('authMail',{mail:fileObj.email,auth:fileObj.authed});                    
                }
            }            
        });
    }else{
        res.redirect('/');
        console.log('パラメータがないよ');
    }
});

router.post('/', function(req, res) {
    var newUser = new User({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name,
        created:new Date()
        })
    newUser.save(function(err){
        if(err){
            console.log('db登録エラー',err);
            if(err && 11000 === err.code){// && err.message.indexof('E11000')
                var errorMsg = [];
                errorMsg.push('そのメールアドレスはすでに登録されてます');
                res.render('add',{error:errorMsg});
            }
            res.redirect('back');
        }else{
            req.session.user = req.body.email;
            req.session.save(function(){ 
                res.redirect('/');
            });
        }
    });
});

router.post('/auth',function(req,res){
    res.redirect('/');
});

module.exports = router;