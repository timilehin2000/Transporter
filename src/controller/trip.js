const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/responses");

const addTripDetails = async (req, res) => {
    try {
        const createTrip = await addBus(req.body);
        if (createTrip.status) {
            return sendSuccessResponse(
                res,
                createTrip.message,
                createTrip.data,
                201
            );
        }
        return sendErrorResponse(res, createTrip.message, {}, 400);
    } catch (err) {
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

module.exports = { addTripDetails };
