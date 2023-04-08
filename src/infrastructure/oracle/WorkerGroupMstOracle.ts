import { WorkerGroupMstEntity } from '../../domain/entities/WorkerGroupMstEntity';
import { IWorkerGroupMstRepository } from '../../domain/repositories/IWorkerGroupMstRepository';
import { OracleHelper } from './OracleHelper';

class WorkerGroupMstOracle implements IWorkerGroupMstRepository {

    public getData(): Promise<readonly WorkerGroupMstEntity[]> {
        const sql: string = 'SELECT worker_group_code, worker_group_name FROM tmp_worker_group_mst';

        return new Promise((resolve, reject) => {
            OracleHelper.query<WorkerGroupMstEntity>(sql, {}, row => {
                return new WorkerGroupMstEntity(
                    row[0],
                    row[1]);
            }).then(entities => {
                resolve(entities);
            }).catch(error => {
                reject(error);
            });
        });
    }

    public save(entity: WorkerGroupMstEntity): Promise<void> {
        const insertSql: string = "INSERT INTO tmp_worker_group_mst (worker_group_code, worker_group_name) VALUES(:workerGroupCode, :workerGroupName)";
        const updateSql: string = "UPDATE tmp_worker_group_mst SET worker_group_name = :workerGroupName WHERE worker_group_code = :workerGroupCode";;

        const parameters: any = {
            workerGroupCode: entity.workerGroupCode.value,
            workerGroupName: entity.workerGroupName.value
        };

        return new Promise<void>((resolve, reject) => {
            OracleHelper.executeUpsert(insertSql, updateSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public delete(entity: WorkerGroupMstEntity): Promise<void> {
        const deleteSql: string = 'DELETE FROM tmp_worker_group_mst WHERE worker_group_code = :workerGroupCode';
        const parameters: any = { workerGroupCode: entity.workerGroupCode.value };

        return new Promise((resolve, reject) => {
            OracleHelper.executeSql(deleteSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export { WorkerGroupMstOracle }