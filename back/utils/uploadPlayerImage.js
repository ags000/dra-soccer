const multer = require('multer');
const path = require('path');
const { v4 } = require('uuid');

function checkFileType(file, cb) {
  const filetypes = /jpg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = file.mimetype === 'image/jpeg';

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb(null, false);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'player-photos/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${v4()}.jpg`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fields: 5,
    fieldNameSize: 50,
    fieldSize: 20000,
    fileSize: 105000000,
  }, // 5 MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

module.exports = upload;

