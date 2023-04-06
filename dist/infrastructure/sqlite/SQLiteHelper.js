"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteHelper = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const Shared_1 = require("../../domain/Shared");
/**
 * SQLiteHelper
 */
class SQLiteHelper {
    static open() {
        const db = new sqlite3_1.default.Database('./example.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });
    }
    static query(sql, parameters, createEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new sqlite3_1.default.Database(SQLiteHelper._dataSource);
            return new Promise((resolve, reject) => {
                db.all(sql, parameters, (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const entities = rows.map(createEntity);
                        resolve(entities);
                    }
                });
                db.close();
            });
        });
    }
    static querySingle(sql, parameters, createEntity, nullEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new sqlite3_1.default.Database(SQLiteHelper._dataSource);
            return new Promise((resolve, reject) => {
                db.get(sql, parameters, (error, row) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const entity = row ? createEntity(row) : nullEntity;
                        resolve(entity);
                    }
                });
                db.close();
            });
        });
    }
    static Execute(insert, update, insertParameters, updateParameters) {
        const db = new sqlite3_1.default.Database(SQLiteHelper._dataSource);
        return new Promise((resolve, reject) => {
            db.run(update, updateParameters, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.changes < 1) {
                        db.run(insert, insertParameters, function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    }
                    else {
                        resolve();
                    }
                }
            });
            db.close();
        });
    }
    static ExecuteSql(sql, parameters) {
        const db = new sqlite3_1.default.Database(SQLiteHelper._dataSource);
        return new Promise((resolve, reject) => {
            db.run(sql, parameters, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
            db.close();
        });
    }
}
exports.SQLiteHelper = SQLiteHelper;
SQLiteHelper._dataSource = Shared_1.Shared.SQLITE_PATH;
