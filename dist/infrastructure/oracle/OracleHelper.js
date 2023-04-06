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
exports.OracleHelper = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const Shared_1 = require("../../domain/Shared");
/**
 * OracleHelper
 */
class OracleHelper {
    static open() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield oracledb_1.default.getConnection(OracleHelper._DBConfig);
                console.log('Connected to the database.');
                connection.release();
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                else {
                    console.error(error);
                }
            }
        });
    }
    static query(sql, parameters, createEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield oracledb_1.default.getConnection(OracleHelper._DBConfig);
                console.log('Connected to the database.');
                const result = yield connection.execute(sql, parameters);
                if (result === undefined || result.rows === undefined) {
                    throw new Error("No results returned from the database.");
                }
                console.log(`result.rows: ${result.rows}`);
                const entities = [];
                for (const row of result.rows) {
                    entities.push(createEntity(row));
                }
                return entities;
            }
            catch (error) {
                throw error;
            }
            finally {
                if (connection) {
                    yield connection.close();
                }
            }
        });
    }
    static querySingle(sql, parameters, createEntity, nullEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield oracledb_1.default.getConnection(OracleHelper._DBConfig);
                const result = yield connection.execute(sql, parameters);
                if (result === undefined || result.rows === undefined) {
                    throw new Error("No results returned from the database.");
                }
                const entity = result.rows.length > 0 ? createEntity(result.rows[0]) : nullEntity;
                return entity;
            }
            catch (error) {
                throw error;
            }
            finally {
                if (connection) {
                    yield connection.close();
                }
            }
        });
    }
    static Execute(insert, update, insertParameters, updateParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield oracledb_1.default.getConnection(OracleHelper._DBConfig);
                let result = yield connection.execute(update, updateParameters, { autoCommit: false });
                if (result === undefined || result.rowsAffected === undefined) {
                    throw new Error("No results returned from the database.");
                }
                if (result.rowsAffected < 1) {
                    result = yield connection.execute(insert, insertParameters, { autoCommit: false });
                }
                yield connection.commit();
            }
            catch (error) {
                if (connection) {
                    yield connection.rollback();
                }
                throw error;
            }
            finally {
                if (connection) {
                    yield connection.close();
                }
            }
        });
    }
    static ExecuteSql(sql, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield oracledb_1.default.getConnection(OracleHelper._DBConfig);
                yield connection.execute(sql, parameters, { autoCommit: true });
            }
            catch (error) {
                throw error;
            }
            finally {
                if (connection) {
                    yield connection.close();
                }
            }
        });
    }
}
exports.OracleHelper = OracleHelper;
OracleHelper._DBConfig = {
    user: Shared_1.Shared.ORACLE_USER,
    password: Shared_1.Shared.ORACLE_PASSWORD,
    connectString: Shared_1.Shared.ORACLE_DATA_SOURCE
};
