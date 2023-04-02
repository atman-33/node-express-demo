class WorkerGroupMstEntity {
    
    public WorkerGroupCode: string;
    public WorkerGroupName: string;

    constructor(workerGroupCode: string, workerGroupName: string) {
        this.WorkerGroupCode = workerGroupCode;
        this.WorkerGroupName = workerGroupName;
    }
}

export { WorkerGroupMstEntity }