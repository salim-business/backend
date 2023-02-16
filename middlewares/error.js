const httpStatus = require('http-status');
const AppError = require('../utils/AppError');

/**
 * Convert error object to AppError Object
 *
 * @function
 * @public
 * @author Koodeyo
 * @param {Object} err Error object
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next Function
 */
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.code === 'ENOENT') error = handleENOENTError(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.name === 'InternalOAuthError') error = handleOAuthError(error);
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(message, statusCode, false, err.stack);
  }
  next(error);
};

/**
 * Handle ENOENT Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleENOENTError = err => {
  return new AppError('File Does Not exist', 404);
};

/**
 * Handle OAuth Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleOAuthError = err => {
  return new AppError(
    err.message,
    err.oauthError.statusCode ? err.oauthError.statusCode : err.oauthError
  );
};

/**
 * Handle Cast DB Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

/**
 * Handle JWT Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleJWTError = err =>
  new AppError('Invalid Token. Please log in again', 401);

/**
 * Handle JWT Expired Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleJWTExpiredError = err =>
  new AppError('Your token has expired! Please log in again.', 401);

/**
 * Handle Validation Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `${errors[0]}`;
  return new AppError(message, 400);
};

/**
 * Handle Duplicate field value Error
 *
 * @function
 * @private
 * @author Koodeyo
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleDuplicateFieldsDB = err => {
  const message = `${err.message.split(' ')[7].replace(/_1/, "")} already in use!`;
  return new AppError(message, 400);
};

/**
 * Error handler
 *
 * @function
 * @public
 * @author Koodeyo
 * @param {Object} err Error object
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next Function
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || httpStatus.BAD_REQUEST;
  
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler
};
