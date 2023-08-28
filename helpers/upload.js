import multer from "multer";
import path from "path";

const tmpPath = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
