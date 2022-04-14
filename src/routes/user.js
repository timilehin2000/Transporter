const express = require("express");
const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../validations/user");

const userRouter = express.Router();

userRouter.post("/register", validateRegisterPayload);
userRouter.post("/login", validateLoginPayload);

module.exports = userRouter;
