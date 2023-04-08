import { WorkerGroupCode } from "../value_objects/WorkerGroupCode"
import { WorkerGroupName } from "../value_objects/WorkerGroupName"
class WorkerGroupMstEntity {

    public workerGroupCode: WorkerGroupCode;
    public workerGroupName: WorkerGroupName;

    constructor(workerGroupCode: string, workerGroupName: string) {
        this.workerGroupCode = WorkerGroupCode.create(workerGroupCode);
        this.workerGroupName = WorkerGroupName.create(workerGroupName);
    }

    public static transFormData(data: readonly WorkerGroupMstEntity[]): any {
        // 引数がreadonlyのため、コピーした変数を準備
        const mutableData: WorkerGroupMstEntity[] = [...data];
        const transformedData = mutableData.map(({ workerGroupCode, workerGroupName }) => ({
            workerGroupCode: workerGroupCode.value,
            workerGroupName: workerGroupName.value
        }));
        return transformedData;
    }
}

export { WorkerGroupMstEntity }