import { Shared } from "../domain/Shared";
import { IWorkerGroupMstRepository } from "../domain/repositories/IWorkerGroupMstRepository";
import { SQLiteHelper } from "./sqlite/SQLiteHelper";
import { OracleHelper } from "./oracle/OracleHelper";
import { WorkerGroupMstSQLite } from "./sqlite/WorkerGroupMstSQLite";
import { WorkerGroupMstOracle } from "./oracle/WorkerGroupMstOracle";

class Factories {
    public static open(): void {
        if (Shared.IS_FAKE) {
            SQLiteHelper.open();
            return;
        }
        OracleHelper.open();
    }

    public static createWorkerGroupMst(): IWorkerGroupMstRepository {
        if (Shared.IS_FAKE) {
            return new WorkerGroupMstSQLite();
        }
        return new WorkerGroupMstOracle();
    }
}

export { Factories }