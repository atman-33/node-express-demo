import oracledb from 'oracledb';
import { Shared } from '../../domain/Shared'

/**
 * OracleHelper
 */
class OracleHelper {

    private static _DBConfig = {
        user: Shared.ORACLE_USER,
        password: Shared.ORACLE_PASSWORD,
        connectString: Shared.ORACLE_DATA_SOURCE
    }

    static async open(): Promise<void> {
        try {
            const connection = await oracledb.getConnection(OracleHelper._DBConfig);
            console.log('Connected to the database.');
            connection.release();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
        }
    }

    public static async query<T>(
        sql: string,
        parameters: any[],
        createEntity: (row: any) => T)
        : Promise<ReadonlyArray<T>> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleHelper._DBConfig);
            console.log('Connected to the database.');
            const result = await connection.execute(sql, parameters, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            if (result === undefined || result.rows === undefined) {
                throw new Error("No results returned from the database.");
            }
            // ここからデバッグ用
            console.log(`result.rows: ${result.rows}`);

            if (result.rows[0] === undefined || result.rows[0] == null) {
                throw new Error("No results returned from the database.");
            }
            const firstColumnValue = Object.values(result.rows[0])[0];
            console.log(`result.rows 1行目の1カラム目: ${firstColumnValue}`);
            // ここまでデバッグ用
            const entities = result.rows.map(createEntity);
            return entities;
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    public static async querySingle<T>(
        sql: string,
        parameters: any[],
        createEntity: (row: any) => T,
        nullEntity: T)
        : Promise<T> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleHelper._DBConfig);
            const result = await connection.execute(sql, parameters, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            if (result === undefined || result.rows === undefined) {
                throw new Error("No results returned from the database.");
            }
            const entity = result.rows.length > 0 ? createEntity(result.rows[0]) : nullEntity;
            return entity;
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    public static async Execute(insert: string, update: string, insertParameters: any[], updateParameters: any[]): Promise<void> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleHelper._DBConfig);
            let result = await connection.execute(update, updateParameters, { autoCommit: false });
            if (result === undefined || result.rowsAffected === undefined) {
                throw new Error("No results returned from the database.");
            }
            if (result.rowsAffected < 1) {
                result = await connection.execute(insert, insertParameters, { autoCommit: false });
            }
            await connection.commit();
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    public static async ExecuteSql(sql: string, parameters: any[]): Promise<void> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleHelper._DBConfig);
            await connection.execute(sql, parameters, { autoCommit: true });
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
}

export { OracleHelper }
