const UserModel = require("../models/user");
const { makeResponse } = require("../helpers/responses");
const { generateJWT } = require("../helpers/utils");
const { findUserByEmail } = require("../helpers/query");

const registerAdmin = async (payload) => {
    const existingAdmin = await findUserByEmail(UserModel, payload.email);

    if (existingAdmin) {
        return makeResponse(false, "EMAIL_DUPLICATE", {});
    }

    const newAdmin = new UserModel({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        isAdmin: true,
    });

    let token = generateJWT(newAdmin);

    const savedAdmin = await newAdmin.save();

    if (!savedAdmin) {
        return makeResponse(false, "REGISTER_FAILED", {});
    }
    return makeResponse(true, "REGISTER_SUCCESS", { newAdmin, token });
};

module.exports = { registerAdmin };
