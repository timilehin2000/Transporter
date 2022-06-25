const express = require("express");
const {
    addBookingDetails,
    removeBooking,
    getAllBookings,
} = require("../controller/booking");

const { authTokenRequired, onlyUser } = require("../middleware/auth");
const {
    validateCreateBookingPayload,
    validateDeletePayloadValidation,
} = require("../helpers/validations/booking");

const bookingRouter = express.Router();

bookingRouter.post(
    "/booking/",
    authTokenRequired,
    validateCreateBookingPayload,
    onlyUser,
    addBookingDetails
);

bookingRouter.delete(
    "/booking/:bookingId",
    authTokenRequired,
    validateDeletePayloadValidation,
    onlyUser,
    removeBooking
);

bookingRouter.get("/booking/", authTokenRequired, onlyUser, getAllBookings);

module.exports = bookingRouter;
