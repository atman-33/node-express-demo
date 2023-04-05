import * as fs from 'fs';

export class Shared {
    private static _config: any;
  
    static load(): void {
        const rawdata = fs.readFileSync("./config/config.json");
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
}