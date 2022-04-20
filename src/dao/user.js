const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { makeResponse } = require("../utils/responses");

const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};

const generateJWT = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d",
        }
    );
};

const registerUser = async (payload) => {
    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
        return makeResponse(false, "EMAIL_DUPLICATE", {});
    }

    const newUser = new UserModel({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
    });

    let token = generateJWT(newUser);

    const savedUser = await newUser.save();

    if (!savedUser) {
        return makeResponse(false, "REGISTER_FAILED", {});
    }
    return makeResponse(true, "REGISTER_SUCCESS", { newUser, token });
};

const loginUser = async (payload) => {
    const existingUser = await findUserByEmail(payload.email);
    if (!existingUser) {
        return makeResponse(false, "INVALID_CREDENTIALS", {});
    }

    const comparePassword = await existingUser.comparePassword(
        payload.password
    );
};

module.exports = {
    registerUser,
    loginUser,
};
