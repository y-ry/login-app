#node.js expressを使ってログイン部分を作製
入力メールアドレスにgmailを使用してメールを送信、  
メール記載のurlにアクセス後、  
パスワードなどのdb登録を行ないます。
***
メール記載のトークンはbase64を使用  
メール記載のトークンをsettings.common.newUserFileBasePathに指定のパスに  
トークンファイルを作製。  
このトークンファイルの削除は仕込んでませぬ。

##使用モジュール（ざっくり）
* node
* express
* mongo/mongoose
* nodemailer(v0.7)
* ejs

##設定ファイル
* /settings/common.js  

