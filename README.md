# firebase-auth-custom-token
フロントエンドとバックエンドのポートが異なる場合に、Firebaseのカスタム認証を成功させるサンプルソースコードを公開しています。

## 認証フロー

1. Slackログインアクションでポップアップを開く
2. ポップアップでSlackログインをしてバックエンドサーバーにリダイレクト
3. リダイレクトURLのCodoを抽出してAccess Tokenを発行する
4. Access Token発行時にuser_idを受け取るのでそれをCustom Tokenのuidに利用する
5. Custom TokenをRedirectの際にCookie設定して期限10sで受け渡す
6. ポップアップ側でCookieを受け取りカスタムログインをしてポップアップを閉じる
7. 親のWindowをリロード してログイン済み状態に移動する

![](https://media.discordapp.net/attachments/883966872389824522/883966916618772490/2.png?width=607&height=563)

