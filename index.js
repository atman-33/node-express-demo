// モジュールを読み込む
const express = require('express');
const config = require('config');

// expressアプリを生成する
const app = express();
console.log('start...');



// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
app.get('/', (req, res) => res.send('Hello ' + config.oracle.user));

// ポート3000でサーバを立てる
app.listen(config.port, () => console.log('Listening on port ' + config.port));