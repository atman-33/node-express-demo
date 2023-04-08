import { Router, Request, Response } from 'express';
import { IWorkerGroupMstRepository } from '../../domain/repositories/IWorkerGroupMstRepository';
import { Factories } from '../../infrastructure/Factories'
import { WorkerGroupMstEntity } from '../../domain/entities/WorkerGroupMstEntity';

const router = Router();
const workerGroupMstRepository: IWorkerGroupMstRepository = Factories.createWorkerGroupMst();

router.get('/worker-group-mst', async (req: Request, res: Response) => {
  try {
    const data = await workerGroupMstRepository.getData();
    res.json(WorkerGroupMstEntity.transFormData(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;