const { addTrip, fetchAllTrips } = require("../dao/trip");
const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/responses");

const addTripDetails = async (req, res) => {
    try {
        const { status, message, data } = await addTrip(req.body);
        if (status) {
            return sendSuccessResponse(res, message, data, 201);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

const fetchTripsDetails = async (req, res) => {
    try {
        const { status, message, data } = await fetchAllTrips(req.query);
        if (status) {
            return sendSuccessResponse(res, message, data, 200);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};
module.exports = { addTripDetails, fetchTripsDetails };
