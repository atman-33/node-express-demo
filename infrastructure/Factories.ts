import { Shared } from "../domain/Shared";
import { IWorkerGroupMstRepository } from "../domain/repositories/IWorkerGroupMstRepository";
import { SQLiteHelper } from "./sqlite/SQLiteHelper";
import { WorkerGroupMstSQLite } from "./sqlite/WorkerGroupMstSQLite";

class Factories {
    public static open(): void {
        if (Shared.IS_FAKE) {
            SQLiteHelper.open();
            return;
        }
        //OracleOdpHelper.open();
    }

    public static createWorkerGroupMst(): IWorkerGroupMstRepository {
        if (Shared.IS_FAKE) {
            return new WorkerGroupMstSQLite();
        }
        // ToDo: 暫定
        return new WorkerGroupMstSQLite();
        //return new WorkerGroupMstOracle();
    }
}

export { Factories }