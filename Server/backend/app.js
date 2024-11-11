const express = require("express");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const bodyParser = require('body-parser'); 
const cors = require("cors");
const multer = require('multer');
const upload = multer();
config({
  path: "./config/config.env",
});

const app = express();
const userModels = require("./routes/userRoutes.js");
const blogModels = require("./routes/blogRoutes.js");
const reviewModels = require("./routes/reviewRoutes.js");
const { ErrorHandler, handleError } = require("./utils/errorHandler.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(handleError);

// Route handling
app.use("/api/v1", userModels);
app.use("/api/v1", blogModels);
app.use("/api/v1", reviewModels);

// Handle unknown routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Centralized error handling
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ success: false, message });
});

module.exports = app;

