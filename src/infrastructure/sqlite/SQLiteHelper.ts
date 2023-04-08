import sqlite3 from 'sqlite3';
import { Shared } from '../../domain/Shared'

/**
 * SQLiteHelper
 */
class SQLiteHelper {

    private static _dataSource: string = Shared.SQLITE_PATH;

    static open(): void {
        const db = new sqlite3.Database('./example.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });
    }

    public static async query<T>(
        sql: string,
        parameters: any,
        createEntity: (row: any) => T)
        : Promise<ReadonlyArray<T>> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise<ReadonlyArray<T>>((resolve, reject) => {
            let replacedSql = sql;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`query sql: ${replacedSql}`);

            db.all(replacedSql, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    const entities = rows.map(createEntity);
                    resolve(entities);
                }
            });

            db.close();
        });
    }

    public static async querySingle<T>(
        sql: string,
        parameters: any,
        createEntity: (row: any) => T,
        nullEntity: T)
        : Promise<T> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise<T>((resolve, reject) => {
            let replacedSql = sql;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`querySingle sql: ${replacedSql}`);

            db.get(replacedSql, (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    const entity = row ? createEntity(row) : nullEntity;
                    resolve(entity);
                }
            });

            db.close();
        });
    }

    public static executeUpsert(insert: string, update: string, parameters: any[]): Promise<void> {
        let replacedSql: string;
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise((resolve, reject) => {
            replacedSql = update;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`update sql: ${replacedSql}`);

            db.run(replacedSql, function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes < 1) {
                        replacedSql = insert;
                        for (const [key, value] of Object.entries(parameters)) {
                            replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
                        }
                        console.log(`insert sql: ${replacedSql}`);
            
                        db.run(replacedSql, function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        resolve();
                    }
                }
            });

            db.close();
        });
    }

    public static executeSql(sql: string, parameters: any[]): Promise<void> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise((resolve, reject) => {
            let replacedSql = sql;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`excute sql: ${replacedSql}`);

            db.run(replacedSql, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });

            db.close();
        });
    }
}

export { SQLiteHelper }