const multer = require("multer");

//where to store
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, "public/gallery");
  },
  filename: (req, file, callback) => {
    return callback(null, Date.now() + file.originalname);
  },
});
module.exports = { storage };
