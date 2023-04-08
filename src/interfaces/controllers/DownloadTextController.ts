import { Router, Request, Response } from 'express';
import { createReadStream } from 'fs';
import path from 'path';

const router = Router();

router.get('/download-text', async (req: Request, res: Response) => {
  const file = path.join('./downloads/sample.txt');
  const fileName = 'sample.txt'; // ダウンロード時のファイル名を設定する
  
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  res.setHeader('Content-type', 'application/octet-stream');

  const fileStream = createReadStream(file);
  fileStream.pipe(res);
});

export default router;