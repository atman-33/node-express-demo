import * as fs from 'fs';

export class Shared {
    private static _config: any;
  
    static load(): void {
        const path = require('path');
        const configPath = "./config/config.json";
        const absolutePath = path.resolve(configPath);
        console.log(`config.json: ${absolutePath}`);

        const rawdata = fs.readFileSync(configPath);
        this._config = JSON.parse(rawdata.toString());
    }
  
    static get PORT(): string {
        if(this._config == null) {
            this.load();
        }
        return Shared._config.port;
    }

    static get IS_FAKE(): boolean {
        if(this._config == null) {
            this.load();
        }
        return Shared._config.is_fake == 1;
    }

    static get SQLITE_PATH(): string {
        if(this._config == null) {
            this.load();
        }
        return Shared._config.sqlite.file_path;
    }

    static get ORACLE_USER(): string {
        if(this._config == null) {
            this.load();
        }
        return Shared._config.oracle.user;
    }

    static get ORACLE_PASSWORD(): string {
        if(this._config == null) {
            this.load();
        }
        return Shared._config.oracle.password;
    }

    static get ORACLE_DATA_SOURCE(): string {
        if(this._config == null) {
            this.load();
        }
        return Shared._config.oracle.data_source;
    }
}