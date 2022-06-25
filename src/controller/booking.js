const {
    addBooking,
    deleteBooking,
    fetchAllBookings,
} = require("../dao/booking");
const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/responses");

const addBookingDetails = async (req, res) => {
    try {
        const { status, message, data } = await addBooking(req.body, req.user);
        if (status) {
            return sendSuccessResponse(res, message, data, 201);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

const removeBooking = async (req, res) => {
    try {
        const { status, message, data } = await deleteBooking(req.params);
        if (status) {
            return sendSuccessResponse(res, message, data, 200);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UNKNOWN_ERROR", {}, 500);
    }
};

const getAllBookings = async (req, res) => {
    try {
        const { status, message, data } = await fetchAllBookings();
        if (status) {
            return sendSuccessResponse(res, message, data, 200);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UNKNOWN_ERROR", {}, 500);
    }
};

module.exports = { addBookingDetails, removeBooking, getAllBookings };
