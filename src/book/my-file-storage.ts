import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (e) {
      console.error('e', e);
    }
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '_' +
      Math.round(Math.random() * 1e9) +
      '_' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage };
