const express = require("express");
const { addBusDetails, fetchAllBuses } = require("../controller/bus");
const { onlyAdmin, authTokenRequired } = require("../middleware/auth");
const { validateAddBusPayload } = require("../validations/bus");

const busRouter = express.Router();

busRouter.post(
    "/bus/",
    validateAddBusPayload,
    authTokenRequired,
    onlyAdmin,
    addBusDetails
);

busRouter.get("/bus", authTokenRequired, onlyAdmin, fetchAllBuses);

module.exports = busRouter;
