'use strict';

var settings = require('./settings');
var mongoose = require('mongoose');
var url = 'mongodb://'+settings.common.dbHost+'/'+settings.common.dbName; // database
var db  = mongoose.createConnection(url, function(err, res){
  if(err){
    console.log('Error connected: ' + url + ' - ' + err);
  }else{
    console.log('Success connected: ' + url);
  }
});

function validator(v) {
    return v.length > 0;
}

// schema = Modelの定義
// schemaのunique指定 http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique
//UserSchema=>User
var UserSchema = new mongoose.Schema({
  email : {type:String, unique: true},
  password :{type:String,default:''},
  authHash : {type:String,defalut:''},
  authed : {type:Date,default:null},
  created  : {type:Date,default:Date.now}
},{collection: settings.common.dbCollectionName});  // collection名を指定する
// (3) モデルの登録 & 利用開始

//token処理参考
/**
 * http://nekok.com/2014/02/node-js-json-web-token/
 * node-jsonwebtoken
 * 
 * Nodemailerにもtoken作製あった。
 */
// Usersの定義をコンパイルして、model = ドキュメントのコンストラクタを生成する
// ここでは'User'というdbにユーザーアカウント情報を足していく、ておいう定義。
exports.User = db.model(settings.common.dbModelName, UserSchema);
