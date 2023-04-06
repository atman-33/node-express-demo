"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const controllers_1 = __importDefault(require("./interfaces/controllers"));
const app = (0, express_1.default)();
// CORS対応（完全無防備：本番環境ではNG）
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*")
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
// })
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// htmlを追加
app.use(express_1.default.static("./dist"));
// apiを追加
app.use('/api', controllers_1.default);
const server = http_1.default.createServer(app);
exports.default = server;
