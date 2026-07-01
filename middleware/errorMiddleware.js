/**
 * Not Found Middleware
 *
 * Catches requests to undefined routes and forwards
 * a 404 error to the error handler.
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Centralized Error Handler Middleware
 *
 * Catches all errors thrown in the application and returns
 * a consistent JSON error response.
 *
 * In development mode, the full stack trace is included.
 * In production mode, only the error message is returned.
 */
const errorHandler = (err, req, res, next) => {
    // If status code is 200 (default), change it to 500 (server error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        // Include stack trace only in development for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };
