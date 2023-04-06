class WorkerGroupMstEntity {
    
    public workerGroupCode: string;
    public workerGroupName: string;

    constructor(workerGroupCode: string, workerGroupName: string) {
        this.workerGroupCode = workerGroupCode;
        this.workerGroupName = workerGroupName;
    }
}

export { WorkerGroupMstEntity }