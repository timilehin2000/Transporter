const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const { makeResponse } = require("../helpers/responses");
const { generateJWT } = require("../helpers/utils");
const { findUserByEmail } = require("../helpers/query");

const registerUser = async (payload) => {
    const { email, firstName, lastName, password, isAdmin } = payload;

    const existingUser = await findUserByEmail(UserModel, payload.email);

    if (existingUser) {
        return makeResponse(false, "EMAIL_DUPLICATE", {});
    }

    const newUser = new UserModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        isAdmin: false,
    });

    let token = generateJWT(newUser);

    const savedUser = await newUser.save();

    if (!savedUser) {
        return makeResponse(false, "REGISTER_FAILED", {});
    }
    return makeResponse(true, "REGISTER_SUCCESS", { newUser, token });
};

const loginUser = async (payload) => {
    const existingUser = await findUserByEmail(UserModel, payload.email);

    if (!existingUser) {
        return makeResponse(false, "INVALID_CREDENTIALS", {});
    }

    const validatePassword = await existingUser.comparePassword(
        payload.password
    );

    if (!validatePassword) {
        return makeResponse(false, "INVALID_CREDENTIALS", {});
    }

    let token = generateJWT(existingUser);

    return makeResponse(true, "LOGIN_SUCCESS", { user: existingUser, token });
};

module.exports = {
    registerUser,
    loginUser,
};
