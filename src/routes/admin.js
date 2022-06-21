const express = require("express");
const { register, login } = require("../controller/admin");
const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../validations/user");

const userRouter = express.Router();

userRouter.post("/auth/register/admin", validateRegisterPayload, register);
// userRouter.post("/auth/login", validateLoginPayload, login);

module.exports = userRouter;
