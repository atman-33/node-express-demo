WebAPIとWebページを起動するテンプレートアプリ
- DDDアーキテクチャ
- TypeScript で開発
- src => dist にjsとhtmlを出力
- dist/server.js からサーバー起動 

## 参考サイト

// expressの開発にTypeScriptを利用する
https://qiita.com/zaburo/items/69726cc42ef774990279

// コーディング規約
https://qiita.com/kabosu3d/items/06ce9266bc2db1226421
https://maasaablog.com/development/frontend/typescript/5078/

## コマンドメモ

// package.json に記載されたモジュールをインストール
npm install

// サーバー起動（apiのみ）
npx ts-node server.ts

## ビルド&サーバー起動の手順

1. distフォルダに存在するフォルダとファイルを削除
del /f /s /q dist\\*.* > nul
for /d %x in (dist\\*) do @rd /s /q %x > nul

2. tsフォルダをビルド
tsc

3. htmlファイルをビルド（コピー）
xcopy /E /I src\\interfaces\\web\\pages\\*.html dist\\interfaces\\web\\pages\\*.html

4. distのエンドポイントを起動
node ./dist/server.js

上記1-4を実行するコマンド（package.jsonで定義）
npm run start

## テスト用
curl -X POST -d '{"WorkerGroupCode":"D","WorkerGroupName":"メテオ"}' http://localhost:3000/api/worker-group-mst

$jsonBody = '{"workerGroupCode":"D","workerGroupName":"メテオ2"}' | Out-String
$utf8Bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
$response = Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/worker-group-mst" -Body $utf8Bytes -ContentType 'application/json; charset=utf-8'

$jsonBody = '{"workerGroupCode":"D","workerGroupName":"メテオ"}'
$response = Invoke-RestMethod -Method Delete -Uri "http://localhost:3000/api/worker-group-mst" -Body $jsonBody -ContentType 'application/json; charset=utf-8'
