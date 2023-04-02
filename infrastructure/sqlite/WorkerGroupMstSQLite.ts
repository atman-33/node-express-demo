import { WorkerGroupMstEntity } from '../../domain/entities/WorkerGroupMstEntity';
import { IWorkerGroupMstRepository } from '../../domain/repositories/IWorkerGroupMstRepository';
import { SQLiteHelper } from './SQLiteHelper';

class WorkerGroupMstSQLite implements IWorkerGroupMstRepository {

    public getData(): Promise<readonly WorkerGroupMstEntity[]> {
        const sql: string = 'SELECT worker_group_code, worker_group_name FROM tmp_worker_group_mst';

        return new Promise((resolve, reject) => {
            SQLiteHelper.query<WorkerGroupMstEntity>(sql, [], row => {
                return new WorkerGroupMstEntity(
                    row.worker_group_code,
                    row.worker_group_name);
            }).then(entities => {
                resolve(entities);
            }).catch(error => {
                reject(error);
            });
        });
    }

    public save(entity: WorkerGroupMstEntity): Promise<void> {
        const insertSql: string = 'INSERT INTO tmp_worker_group_mst (worker_group_code, worker_group_name) VALUES(?, ?)';
        const updateSql: string = 'UPDATE tmp_worker_group_mst SET worker_group_name = ? WHERE worker_group_code = ?';

        const insertParameters: any[] = [
            entity.WorkerGroupCode,
            entity.WorkerGroupName
        ];

        const updateParameters: any[] = [
            entity.WorkerGroupName,
            entity.WorkerGroupCode
        ];

        return new Promise<void>((resolve, reject) => {
            SQLiteHelper.Execute(insertSql, updateSql, insertParameters, updateParameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public delete(entity: WorkerGroupMstEntity): Promise<void> {
        const deleteSql: string = 'DELETE FROM tmp_worker_group_mst WHERE worker_group_code = ?';
        const parameters: any[] = [entity.WorkerGroupCode];

        return new Promise((resolve, reject) => {
            SQLiteHelper.ExecuteSql(deleteSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export { WorkerGroupMstSQLite }