const multer = require("multer");

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images/products`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProduct = multer({ storage: productStorage });

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images/avatars`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadAvatar = multer({ storage: avatarStorage });

module.exports = { uploadProduct, uploadAvatar };
