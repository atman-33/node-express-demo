"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerGroupMstOracle = void 0;
const WorkerGroupMstEntity_1 = require("../../domain/entities/WorkerGroupMstEntity");
const OracleHelper_1 = require("./OracleHelper");
class WorkerGroupMstOracle {
    getData() {
        const sql = 'SELECT worker_group_code, worker_group_name FROM tmp_worker_group_mst';
        return new Promise((resolve, reject) => {
            OracleHelper_1.OracleHelper.query(sql, [], row => {
                return new WorkerGroupMstEntity_1.WorkerGroupMstEntity(row[0], row[1]);
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
            OracleHelper_1.OracleHelper.Execute(insertSql, updateSql, insertParameters, updateParameters)
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
            OracleHelper_1.OracleHelper.ExecuteSql(deleteSql, parameters)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.WorkerGroupMstOracle = WorkerGroupMstOracle;
