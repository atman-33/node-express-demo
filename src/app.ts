import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import api from './interfaces/controllers';

const app = express();

// CORS対応（完全無防備：本番環境ではNG）
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*")
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// htmlを追加
const path = require('path');
const webPagesPath = path.resolve(__dirname, 'interfaces/web/pages');
console.log(`webPages: ${webPagesPath}`);
app.use(express.static(webPagesPath));

// apiを追加
app.use('/api', api);

const server = http.createServer(app);

export default server;
