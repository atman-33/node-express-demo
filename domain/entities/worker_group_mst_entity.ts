class WorkerGroupMstEntity {
    
    WorkerGroupCode: string;
    WorkerGroupName: string;

    constructor(workerGroupCode: string, workerGroupName: string) {
        this.WorkerGroupCode = workerGroupCode;
        this.WorkerGroupName = workerGroupName;
    }
}