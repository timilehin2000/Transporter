const { registerUser } = require("../dao/user");
const {
    sendSuccessResponse,
    sendErrorResponse,
} = require("../utils/responses");

const register = async (req, res) => {
    try {
        const createUser = await registerUser(req.body);
        if (createUser.status) {
            return sendSuccessResponse(
                res,
                createUser.message,
                createUser.data,
                201
            );
        }
        return sendErrorResponse(res, createUser.message, {}, 400);
    } catch (err) {
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

module.exports = {
    register,
};
