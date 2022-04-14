const handler = require("./message");

const makeResponse = (status, message, data) => {
    if (status) {
        return {
            status,
            message: message,
            data: data,
        };
    }
    return {
        status,
        message: message,
        data: data,
    };
};

const sendSuccessResponse = (res, message, data, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message: handler.getMessages(message) || message,
        data: data,
    });
};

const sendErrorResponse = (res, message, data, statusCode = 400) => {
    return res.status(statusCode).json({
        status: false,
        message: handler.getMessages(message) || message,
        data: data,
    });
};

const handleValidationError = (validatedData, res) => {
    const message = validatedData.error.details[0].message;
    return sendErrorResponse(res, message, {}, 400);
};

module.exports = {
    makeResponse,
    sendSuccessResponse,
    sendErrorResponse,
    handleValidationError,
};
