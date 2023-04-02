class WorkerGroupMstEntity {
    
    private _workerGroupCode: string;
    private _workerGroupName: string;

    constructor(workerGroupCode: string, workerGroupName: string) {
        this._workerGroupCode = workerGroupCode;
        this._workerGroupName = workerGroupName;
    }

    public get WorkerGroupCode(): string{
        return this._workerGroupCode;
    }

    public get WorkerGroupName(): string{
        return this._workerGroupName;
    }
}

export { WorkerGroupMstEntity }