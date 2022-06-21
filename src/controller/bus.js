const { addBus } = require("../dao/bus");
const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/responses");

const addBusDetails = async (req, res) => {
    try {
        const createBus = await addBus(req.body);
        if (createBus.status) {
            return sendSuccessResponse(
                res,
                createBus.message,
                createBus.data,
                201
            );
        }
        return sendErrorResponse(res, createBus.message, {}, 400);
    } catch (err) {
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

module.exports = { addBusDetails };
