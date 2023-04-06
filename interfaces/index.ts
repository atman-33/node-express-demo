import express, { Application } from 'express';
import workerGroupMstController from './controllers/WorkerGroupMstController';

const app: Application = express();

app.use(workerGroupMstController);

export default app;
