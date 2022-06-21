const express = require("express");
const { addBusDetails } = require("../controller/bus");
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
// busRouter.post("/auth/", validateLoginPayload, login);

module.exports = busRouter;
