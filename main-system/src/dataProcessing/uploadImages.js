const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "main-system/public/images");
  },
  filename: function (req, file, cb) {
    //TODO: change file name to product id
    cd(null, req.body.ProductID + ".jpg");
    //cb(null, file.originalname);
  },
});

const uploadImages = multer({ storage: storage });

module.exports = uploadImages;
