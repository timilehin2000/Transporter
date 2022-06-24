const express = require("express");
const { addBookingDetails } = require("../controller/booking");

const { authTokenRequired, onlyUser } = require("../middleware/auth");
const {
    validateCreateBookingPayload,
} = require("../helpers/validations/booking");

const bookingRouter = express.Router();

bookingRouter.post(
    "/booking/",
    authTokenRequired,
    validateCreateBookingPayload,
    onlyUser,
    addBookingDetails
);

// bookingRouter.get("/bus", authTokenRequired, onlyAdmin, fetchAllBuses);

module.exports = bookingRouter;
