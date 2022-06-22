const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const generateJWT = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d",
        }
    );
};

module.exports = { generateJWT };
