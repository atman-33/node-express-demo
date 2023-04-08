import express, { Application } from 'express';
import downloadApkController from './DownloadApkController';
import downloadTextController from './DownloadTextController';
import workerGroupMstController from './WorkerGroupMstController';

const app: Application = express();

app.use(downloadApkController);
app.use(downloadTextController);

app.use(workerGroupMstController);

export default app;
