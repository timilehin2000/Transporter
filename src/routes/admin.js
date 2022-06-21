const express = require("express");
const { register, createAdmin } = require("../controller/admin");
const { onlyAdmin, authTokenRequired } = require("../middleware/auth");
const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../validations/user");

const adminRouter = express.Router();

adminRouter.post("/auth/admin/register/", validateRegisterPayload, register);
adminRouter.post(
    "/auth/admin/",
    validateRegisterPayload,
    authTokenRequired,
    onlyAdmin,
    register
);

module.exports = adminRouter;
