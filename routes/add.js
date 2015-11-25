'use strict';

var express = require('express');
var router = express.Router();
var model = require('../model.js');
var User = model.User;
var base64 = require('base64url');
var settings = require('../settings');
var mailer = require('nodemailer');
var fs = require("fs");
/**
 * @param string mailaddress
 * @return string base64(mail*seed)
 */
var getAuthHash = function (str){
    var seed = settings.common.seed;
    return base64.encode(str+seed);
}
var sendMail = function(currentDate,req,res){
    var smtpSettings = {
        host: settings.common.authMail.host,
        service:settings.common.authMail.service,
        auth:{
            user:settings.common.authMail.auth_user,
            pass:settings.common.authMail.auth_pass,
            port:settings.common.authMail.port,
        }
    };
    var smtp = mailer.createTransport('SMTP', smtpSettings);
    console.log('mailAuth',getAuthHash(req.body.email));
    var href = req.protocol + '://' + req.get('host')+'/authMail/auth?auth='+getAuthHash(req.body.email+currentDate);
    var mailHtml = '<h2>以下のメールアドレスを'+settings.common.addingUserAllowMinute+'分以内にクリックして、認証完了してくだされ。</h2>';
    mailHtml += '<p><a href="'+href+'">';
    mailHtml += href;
    mailHtml += '</a></p>';
    var mailOp = {
        from:settings.common.authMail.mail_from,
        to:req.body.email,
        subject:settings.common.authMail.subject,
        html:mailHtml
    };
    console.log('メール送信します。。。',smtpSettings,mailOp);
    var resOrg = res;
    smtp.sendMail(mailOp,function(err,res){
        if(err){
            console.log(err);
        }else{
            console.log('メール送信完了',smtpSettings,mailOp);
            resOrg.render('sendedMail',{email:req.body.email});
        }
    });            
    
}
var errorMsg = [];
router.post('/', function(req, res) {
    var currentDate = new Date();
    console.log('req.body',req.body);
    console.log('mongoAuth',getAuthHash(req.body.email));
    var fileName = settings.common.newUserFileBasePath+'/'+getAuthHash(req.body.email+currentDate)+'.json',
    fileContent = {
        email:req.body.email,
        authed:new Date()
        };
    fs.writeFile(fileName, JSON.stringify(fileContent),{},function(err){
    //fs.writeFileSync(fileName, JSON.stringify(fileContent),{},function(err){
        if(err){
            console.log('ファイル作製エラー',err);
        }else{
            console.log('ファイル作製完了。メール送信します。');
            sendMail(currentDate,req,res);
        }        
    });
    // var newUser = new User({ 
    //     email: req.body.email ,
    //     authHash:getAuthHash(req.body.email),
    //     authed:new Date()        
    //     });
    // newUser.save(function(err) {
    //     if (err) {
    //         console.log(err);
    //         // res.redirect('back');
    //         if(err && 11000 === err.code){// && err.message.indexof('E11000')
    //             errorMsg.push('そのメールアドレスはすでに登録されてます');
    //         }
    //         res.render('add',{error:errorMsg});
    //     } else {
    //         var smtpSettings = {
    //             host: settings.common.authMail.host,
    //             service:settings.common.authMail.service,
    //             auth:{
    //                 user:settings.common.authMail.auth_user,
    //                 pass:settings.common.authMail.auth_pass,
    //                 port:settings.common.authMail.port,
    //             }
    //         };
    //         var smtp = mailer.createTransport('SMTP', smtpSettings);
    //         console.log('mailAuth',getAuthHash(req.body.email));
    //         var mailHtml = '<h2>以下のメールアドレスを30分以内にクリックして、認証完了してくだされ。</h2>';
    //         mailHtml += '<p><a href="'+req.protocol + '://' + req.get('host')+'/autuMail?auth='+getAuthHash(req.body.email)+'">';
    //         mailHtml += req.protocol + '://' + req.get('host')+'/authMail?auth='+getAuthHash(req.body.email);
    //         mailHtml += '</a></p>';
    //         var mailOp = {
    //             from:settings.common.authMail.mail_from,
    //             to:req.body.email,
    //             subject:settings.common.authMail.subject,
    //             html:mailHtml
    //         };
    //         console.log('メール送信します。。。',smtpSettings,mailOp);
    //         var resOrg = res;
    //         smtp.sendMail(mailOp,function(err,res){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log('メール送信完了',smtpSettings,mailOp);
    //                 resOrg.render('sendedMail',{email:req.body.email});
    //             }
    //         });
    //     }
    // });
});

router.get('/', function(req, res) {
    res.render('add',{error:errorMsg});
});

module.exports = router;