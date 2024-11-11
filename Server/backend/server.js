
const dotenv = require("dotenv");
const app = require("./app.js");
const cloudinary=require("cloudinary");
const connectDataBase=require("./config/database.js") 

connectDataBase();
 


 app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
});