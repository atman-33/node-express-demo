"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shared = void 0;
const fs = __importStar(require("fs"));
class Shared {
    static load() {
        const path = require('path');
        const configPath = "./config/config.json";
        const absolutePath = path.resolve(configPath);
        console.log(`config.json: ${absolutePath}`);
        const rawdata = fs.readFileSync(configPath);
        this._config = JSON.parse(rawdata.toString());
    }
    static get PORT() {
        if (this._config == null) {
            this.load();
        }
        return Shared._config.port;
    }
    static get IS_FAKE() {
        if (this._config == null) {
            this.load();
        }
        return Shared._config.is_fake == 1;
    }
    static get SQLITE_PATH() {
        if (this._config == null) {
            this.load();
        }
        return Shared._config.sqlite.file_path;
    }
    static get ORACLE_USER() {
        if (this._config == null) {
            this.load();
        }
        return Shared._config.oracle.user;
    }
    static get ORACLE_PASSWORD() {
        if (this._config == null) {
            this.load();
        }
        return Shared._config.oracle.password;
    }
    static get ORACLE_DATA_SOURCE() {
        if (this._config == null) {
            this.load();
        }
        return Shared._config.oracle.data_source;
    }
}
exports.Shared = Shared;
