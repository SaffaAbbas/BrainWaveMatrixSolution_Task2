// cloudinaryUpload.js
const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (dataUris) => {
    const uploadPromises = dataUris.map(dataUri =>
        cloudinary.uploader.upload(dataUri.content)
    );

    return Promise.all(uploadPromises);
};

module.exports = uploadToCloudinary;
