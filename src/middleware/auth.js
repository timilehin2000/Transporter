const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../helpers/query");
const { sendErrorResponse } = require("../helpers/responses");
const { verifyToken } = require("../helpers/utils");
const UserModel = require("../models/user");

const onlyAdmin = async (req, res, next) => {
    const { email } = req.user;

    try {
        const { data } = await findUserByEmail(UserModel, email);

        if (!data.isAdmin) {
            return sendErrorResponse(res, "ONLY_ADMIN", {}, 403);
        }
        next();
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UNKNOWN_ERROR", {}, 500);
    }
};

const onlyUser = async (req, res, next) => {
    const { email } = req.user;
    try {
        const { data } = await findUserByEmail(UserModel, email);

        if (data.isAdmin) {
            return sendErrorResponse(res, "ONLY_USER", {}, 403);
        }
        return next();
    } catch (err) {
        console.log(err);
        return err;
    }
};

const authTokenRequired = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.replace("Bearer ", "");

        try {
            const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (!verifiedUser) {
                return res.status(400).json({
                    message: "User not found",
                });
            }

            const user = await UserModel.findOne({ email: verifiedUser.email });

            if (!user)
                return res.status(401).json({ message: "Access Denied" });

            req.user = user;

            next();
        } catch (err) {
            console.log(err);
            return res.status(401).json({ message: "Access Denied" });
        }
    } else {
        return res.status(401).json({ message: "Access Denied" });
    }
};

module.exports = { onlyAdmin, authTokenRequired, onlyUser };
