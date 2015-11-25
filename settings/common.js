'use strict';

var common = {
    sessionSecret:'secret_key2',
    dbName:'sample-login',
    dbHost:'localhost',
    dbCollectionName:'info',
    dbModelName:'User',
    authSeed:'sadagoet34afoa_3*35',
    authMail:{
        host:'smtp.gmail.com',
        service:'Gmail',
        auth_user:'hoge@gmail.com',
        auth_pass:'foo',
        port:'587',
        subject:'認証メール',
        mail_from:'ryo.saule@gmail.com'
    },
    newUserFileBasePath:'PATH_TO_YOUR_TOKEN_FILE_SAVING_DIR',
    addingUserAllowMinute:60
};

module.exports = common;