const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode == 200 ? 500 : err.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    }); 
};

module.exports = errorHandler;
