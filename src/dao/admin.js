const UserModel = require("../models/user");
const { makeResponse } = require("../helpers/responses");
const { generateJWT } = require("../helpers/utils");
const { findUserByEmail, updateItemByEmail } = require("../helpers/query");

const registerAdmin = async (payload) => {
    const { email, firstName, lastName, password, isAdmin } = payload;

    const { status } = await findUserByEmail(UserModel, email);

    if (status) {
        return makeResponse(false, "EMAIL_DUPLICATE", {});
    }

    const newAdmin = new UserModel({
        email,
        firstName,
        lastName,
        password,
        isAdmin: true,
    });

    let token = generateJWT(newAdmin);

    const savedAdmin = await newAdmin.save();

    if (!savedAdmin) {
        return makeResponse(false, "REGISTER_FAILED", {});
    }
    return makeResponse(true, "REGISTER_SUCCESS", { newAdmin, token });
};

const updateToAdmin = async (payload) => {
    const { email, isAdmin } = payload;

    const { status, data } = await findUserByEmail(UserModel, email);

    if (!status) {
        return makeResponse(false, "USER_QUERY_FAILURE", {});
    }

    if (data.isAdmin) {
        return makeResponse(false, "USER_ALREADY_ADMIN", {});
    }

    const updatedAdmin = await updateItemByEmail(UserModel, email, { isAdmin });

    if (updatedAdmin.status) {
        return makeResponse(true, "ITEM_UPDATE_SUCCESS", updatedAdmin.data);
    }
    return makeResponse(false, "ITEM_UPDATE_FAILURE", {});
};
module.exports = { registerAdmin, updateToAdmin };
