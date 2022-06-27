const express = require("express");
const {
    addBookingDetails,
    removeBooking,
    getAllBookings,
    updateBookingSeat,
} = require("../controller/booking");

const { authTokenRequired, onlyUser } = require("../middleware/auth");
const {
    validateCreateBookingPayload,
    validateDeletePayloadValidation,
    validateUpdatePayloadValidation,
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

bookingRouter.patch(
    "/booking/",
    authTokenRequired,
    validateUpdatePayloadValidation,
    onlyUser,
    updateBookingSeat
);

bookingRouter.get("/booking/", authTokenRequired, onlyUser, getAllBookings);

module.exports = bookingRouter;
