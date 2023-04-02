import express from 'express';
import * as fs from 'fs';

import {WorkerGroupMstEntity} from './domain/entities/worker_group_mst_entity';

// configを読み込み
const rawdata = fs.readFileSync("./config/config.json");
const config = JSON.parse(rawdata.toString());

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(config.port, () => {
    console.log("Start on port " + config.port + ".")
})

const entities: WorkerGroupMstEntity[] = [
    { WorkerGroupCode: 'A', WorkerGroupName: 'カブトムシ' },
    { WorkerGroupCode: 'B', WorkerGroupName: 'クワガタ' }
] 

//一覧取得
app.get('/entities', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify(entities))
})