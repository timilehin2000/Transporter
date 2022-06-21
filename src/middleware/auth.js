const { findUserByEmail } = require("../helpers/query");
const { sendErrorResponse } = require("../helpers/responses");
const { verifyToken } = require("../helpers/utils");
const UserModel = require("../models/user");

const onlyAdmin = async (req, res, next) => {
    try {
        const checkAdmin = await findUserByEmail(UserModel, req.body.email);
        if (!checkAdmin) {
            return next();
        }
        if (!checkAdmin.isAdmin) {
            return sendErrorResponse(res, "ONLY_ADMIN", {}, 403);
        }
        return next();
    } catch (err) {
        console.log(err);
        return err;
    }
};

const authTokenRequired = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        sendErrorResponse(res, "TOKEN_ERROR", {}, 401);
    }

    const verified = await verifyToken(token.split(" ")[1]);

    if (!verified.status) {
        sendErrorResponse(res, verified.message, {}, 401);
    }
    req.user = verified.data;
    return next();
};

module.exports = { onlyAdmin, authTokenRequired };