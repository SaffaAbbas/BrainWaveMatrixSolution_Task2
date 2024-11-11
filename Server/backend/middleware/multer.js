
const multer = require("multer");

const storage = multer.memoryStorage();

const multipleUpload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        console.log("Inside multer middleware. File received:", file);
        cb(null, true);
    }
}).array("file", 10); // Accept up to 10 files with the field name "file"

module.exports = multipleUpload;
