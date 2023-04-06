"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factories = void 0;
const Shared_1 = require("../domain/Shared");
const SQLiteHelper_1 = require("./sqlite/SQLiteHelper");
const OracleHelper_1 = require("./oracle/OracleHelper");
const WorkerGroupMstSQLite_1 = require("./sqlite/WorkerGroupMstSQLite");
const WorkerGroupMstOracle_1 = require("./oracle/WorkerGroupMstOracle");
class Factories {
    static open() {
        if (Shared_1.Shared.IS_FAKE) {
            SQLiteHelper_1.SQLiteHelper.open();
            return;
        }
        OracleHelper_1.OracleHelper.open();
    }
    static createWorkerGroupMst() {
        if (Shared_1.Shared.IS_FAKE) {
            return new WorkerGroupMstSQLite_1.WorkerGroupMstSQLite();
        }
        return new WorkerGroupMstOracle_1.WorkerGroupMstOracle();
    }
}
exports.Factories = Factories;
