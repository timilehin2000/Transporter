const express = require("express");
const { addTripDetails } = require("../controller/trip");
const { onlyAdmin, authTokenRequired } = require("../middleware/auth");
const { validateCreateTripPayload } = require("../validations/trip");

const tripRouter = express.Router();

tripRouter.post(
    "/trip/",
    validateCreateTripPayload,
    authTokenRequired,
    onlyAdmin,
    addTripDetails
);

module.exports = tripRouter;
