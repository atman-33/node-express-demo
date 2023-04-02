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
        parameters: any[],
        createEntity: (row: any) => T)
        : Promise<ReadonlyArray<T>> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise<ReadonlyArray<T>>((resolve, reject) => {
            db.serialize(() => {
                db.all(sql, parameters, (error, rows) => {
                    if (error) {
                        reject(error);
                    } else {
                        const entities = rows.map(createEntity);
                        resolve(entities);
                    }
                });
            });

            db.close();
        });
    }

    public static async querySingle<T>(
        sql: string,
        parameters: any[],
        createEntity: (row: any) => T,
        nullEntity: T)
        : Promise<T> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise<T>((resolve, reject) => {
            db.serialize(() => {
                db.get(sql, parameters, (error, row) => {
                    if (error) {
                        reject(error);
                    } else {
                        const entity = row ? createEntity(row) : nullEntity;
                        resolve(entity);
                    }
                });
            });

            db.close();
        });
    }

    public static Execute(insert: string, update: string, insertParameters: any[], updateParameters: any[]): Promise<void> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(update, updateParameters, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes < 1) {
                            db.run(insert, insertParameters, function (err) {
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
            });

            db.close();
        });
    }

    public static ExecuteSql(sql: string, parameters: any[]): Promise<void> {
        const db = new sqlite3.Database(SQLiteHelper._dataSource);

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(sql, parameters, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            db.close();
        });
    }
}

export { SQLiteHelper }