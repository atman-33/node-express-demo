import express from 'express';
import { WorkerGroupMstEntity } from './domain/entities/WorkerGroupMstEntity';
import { Shared } from './domain/Shared'
import { IWorkerGroupMstRepository } from './domain/repositories/IWorkerGroupMstRepository';
import { Factories } from './infrastructure/Factories'

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(Shared.PORT, () => {
    console.log("Start on port " + Shared.PORT + ".")
})

// const entities: WorkerGroupMstEntity[] = [
//     new WorkerGroupMstEntity('A','カブトムシ'),
//     new WorkerGroupMstEntity('B','クワガタ')
// ] 

const workerGroupMstRepository: IWorkerGroupMstRepository = Factories.createWorkerGroupMst();

// 一覧取得
const fetchData = async () => {
    const data = await workerGroupMstRepository.getData();
    app.get('/entities', (req: express.Request, res: express.Response) => {
        res.send(JSON.stringify(data))
    })

    return data;
};

fetchData().then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});