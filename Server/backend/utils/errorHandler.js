class ErrorHandler extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode = 500, message = 'Internal Server Error' } = err;
  res.status(statusCode).json({
      success: false,
      error: message,
  });
};

module.exports = { ErrorHandler, handleError };


