const express = require("express");
const { addTripDetails, fetchTripsDetails } = require("../controller/trip");
const { onlyAdmin, authTokenRequired } = require("../middleware/auth");
const { validateCreateTripPayload } = require("../helpers/validations/trip");

const tripRouter = express.Router();

tripRouter.post(
    "/trip/",
    validateCreateTripPayload,
    authTokenRequired,
    onlyAdmin,
    addTripDetails
);

tripRouter.get("/trip/", authTokenRequired, onlyAdmin, fetchTripsDetails);

module.exports = tripRouter;
