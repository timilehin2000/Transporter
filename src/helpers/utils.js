const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { makeResponse } = require("./responses");

const generateJWT = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d",
        }
    );
};

/**
 * verifyToken
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const verifyToken = async (token) => {
    if (!token) {
        return makeResponse(false, TOKEN_ERROR, {});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await UserModel.findOne({ _id: decoded._id });

        if (!user) {
            return makeResponse(false, INVALID_TOKEN, {});
        }
        return makeResponse(true, "", user);
    } catch (err) {
        return makeResponse(false, "INVALID_TOKEN", {});
    }
};

module.exports = { generateJWT, verifyToken };
