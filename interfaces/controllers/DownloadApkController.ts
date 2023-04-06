import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get('/download-apk', async (req: Request, res: Response) => {
  const filePath = path.join('../', __dirname, '/public/fake-apk.txt');
  console.log(`download-file-path: ${filePath}`);
  res.download(filePath);
});

export default router;