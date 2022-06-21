const express = require("express");
const { register, createAdmin } = require("../controller/admin");
const { onlyAdmin, authTokenRequired } = require("../middleware/auth");
const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../validations/user");

const userRouter = express.Router();

userRouter.post("/auth/admin/register", validateRegisterPayload, register);
userRouter.post(
    "/auth/admin",
    validateLoginPayload,
    authTokenRequired,
    onlyAdmin,
    register
);

module.exports = userRouter;
