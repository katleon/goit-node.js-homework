import multer from "multer";
import path from "path";

const tempPath = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
