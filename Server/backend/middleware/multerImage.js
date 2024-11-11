const multer = require("multer");

const storage = multer.memoryStorage();

const singleUpload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        console.log("Inside multer middleware. File received:", file); // Log the received file
        cb(null, true); // Accept the file
    }
}).single("file"); // Make sure 'picture' matches the key in the form-data

module.exports = singleUpload;