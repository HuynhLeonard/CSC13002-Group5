const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // wrong id of mongo
    if(err.name === "CastError") {
        const message = `Resources not found with this ID.`;
        err = new ErrorHandler(message,400);
    }

    // duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    // wrong jwt error (authenication)
    if(err.name === "JsonWebTokenError") {
        const message = "Your url is invalid, try again later.";
        err = new ErrorHandler(message,400);
    }

    // wrong jwt error
    if(err.name === 'TokenExpiredError') {
        const message ='Your url is expired, please try again later.';
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};