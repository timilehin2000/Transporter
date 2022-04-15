const express = require("express");
const { register } = require("../controller/user");
const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../validations/user");

const userRouter = express.Router();

userRouter.post("/auth/register", validateRegisterPayload, register);
userRouter.post("/auth/login", validateLoginPayload);

module.exports = userRouter;
