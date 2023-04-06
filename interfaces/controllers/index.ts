import express, { Application } from 'express';
import workerGroupMstController from './WorkerGroupMstController';
import downloadApkController from './DownloadApkController';

const app: Application = express();

app.use(workerGroupMstController);
app.use(downloadApkController);

export default app;
