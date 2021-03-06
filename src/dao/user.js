const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const { makeResponse } = require("../helpers/responses");
const { generateJWT } = require("../helpers/utils");
const { findUserByEmail } = require("../helpers/query");

const registerUser = async (payload) => {
    const { email, firstName, lastName, password } = payload;

    const existingUser = await findUserByEmail(UserModel, payload.email);

    if (existingUser.status) {
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
    const { email, password } = payload;

    const { status, data } = await findUserByEmail(UserModel, email);

    if (!status) {
        return makeResponse(false, "INVALID_CREDENTIALS", {});
    }

    const validatePassword = await data.comparePassword(password);

    if (!validatePassword) {
        return makeResponse(false, "INVALID_CREDENTIALS", {});
    }

    let token = generateJWT(data);

    return makeResponse(true, "LOGIN_SUCCESS", { user: data, token });
};

module.exports = {
    registerUser,
    loginUser,
};
