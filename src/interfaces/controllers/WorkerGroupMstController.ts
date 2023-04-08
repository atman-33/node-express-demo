import { Router, Request, Response,json } from 'express';
import { IWorkerGroupMstRepository } from '../../domain/repositories/IWorkerGroupMstRepository';
import { Factories } from '../../infrastructure/Factories'
import { WorkerGroupMstEntity } from '../../domain/entities/WorkerGroupMstEntity';

const router = Router();
const workerGroupMstRepository: IWorkerGroupMstRepository = Factories.createWorkerGroupMst();

router.use(json()); // body-parser middleware

router.get('/worker-group-mst', async (req: Request, res: Response) => {
  try {
    const data = await workerGroupMstRepository.getData();
    res.json(WorkerGroupMstEntity.transFormData(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/worker-group-mst', async (req: Request, res: Response) => {
  // postする側の文字列はUTF-8とすること
  const { workerGroupCode, workerGroupName } = req.body;

  console.log(`/worker-group-mst => post => workerGroupCode: ${workerGroupCode}`);
  console.log(`/worker-group-mst => post => workerGroupName: ${workerGroupName}`);

  if (!workerGroupCode || !workerGroupName) {
    return res.status(400).send({ message: 'WorkerGroupCode and WorkerGroupName are required.' });
  }

  const entity = new WorkerGroupMstEntity(workerGroupCode, workerGroupName);
  try {
    await workerGroupMstRepository.save(entity);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/worker-group-mst', async (req: Request, res: Response) => {
  const { workerGroupCode, workerGroupName } = req.body;

  console.log(`/worker-group-mst => delete => workerGroupCode: ${workerGroupCode}`);
  console.log(`/worker-group-mst => delete => workerGroupName: ${workerGroupName}`);

  if (!workerGroupCode) {
    return res.status(400).send({ message: 'workerGroupCode are required.' });
  }

  const entity = new WorkerGroupMstEntity(workerGroupCode, workerGroupName);
  try {
    await workerGroupMstRepository.delete(entity);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;