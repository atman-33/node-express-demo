import { Router, Request, Response } from 'express';
import { createReadStream } from 'fs';
import path from 'path';

const router = Router();

router.get('/download-apk', async (req: Request, res: Response) => {
  const file = path.join('./downloads/app-release.apk');
  const fileName = 'app-release.apk'; // ダウンロード時のファイル名を設定する
  
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  res.setHeader('Content-type', 'application/vnd.android.package-archive');

  const fileStream = createReadStream(file);
  fileStream.pipe(res);
});

export default router;
