"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerGroupMstSQLite = void 0;
const WorkerGroupMstEntity_1 = require("../../domain/entities/WorkerGroupMstEntity");
const SQLiteHelper_1 = require("./SQLiteHelper");
class WorkerGroupMstSQLite {
    getData() {
        const sql = 'SELECT worker_group_code, worker_group_name FROM tmp_worker_group_mst';
        return new Promise((resolve, reject) => {
            SQLiteHelper_1.SQLiteHelper.query(sql, [], row => {
                return new WorkerGroupMstEntity_1.WorkerGroupMstEntity(row.worker_group_code, row.worker_group_name);
            }).then(entities => {
                resolve(entities);
            }).catch(error => {
                reject(error);
            });
        });
    }
    save(entity) {
        const insertSql = 'INSERT INTO tmp_worker_group_mst (worker_group_code, worker_group_name) VALUES(?, ?)';
        const updateSql = 'UPDATE tmp_worker_group_mst SET worker_group_name = ? WHERE worker_group_code = ?';
        const insertParameters = [
            entity.workerGroupCode,
            entity.workerGroupName
        ];
        const updateParameters = [
            entity.workerGroupName,
            entity.workerGroupCode
        ];
        return new Promise((resolve, reject) => {
            SQLiteHelper_1.SQLiteHelper.Execute(insertSql, updateSql, insertParameters, updateParameters)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    delete(entity) {
        const deleteSql = 'DELETE FROM tmp_worker_group_mst WHERE worker_group_code = ?';
        const parameters = [entity.workerGroupCode];
        return new Promise((resolve, reject) => {
            SQLiteHelper_1.SQLiteHelper.ExecuteSql(deleteSql, parameters)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.WorkerGroupMstSQLite = WorkerGroupMstSQLite;
