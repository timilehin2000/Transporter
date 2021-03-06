const express = require("express");
const { addBusDetails, fetchAllBuses } = require("../controller/bus");
const { onlyAdmin, authTokenRequired, auth } = require("../middleware/auth");
const { validateAddBusPayload } = require("../helpers/validations/bus");

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
