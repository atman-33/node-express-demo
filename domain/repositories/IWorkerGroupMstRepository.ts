import { WorkerGroupMstEntity } from '../entities/WorkerGroupMstEntity';

interface IWorkerGroupMstRepository {

    getData(): Promise<readonly WorkerGroupMstEntity[]>;
    save(entity: WorkerGroupMstEntity): Promise<void>;
    delete(entity: WorkerGroupMstEntity): Promise<void>;
}

export { IWorkerGroupMstRepository };