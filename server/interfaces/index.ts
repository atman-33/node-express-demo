import express, { Application } from 'express';
import workerGroupMstController from './http/WorkerGroupMstController';

const app: Application = express();

app.use(workerGroupMstController);

export default app;
