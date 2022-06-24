const { registerAdmin, updateToAdmin } = require("../dao/admin");
const {
    sendSuccessResponse,
    sendErrorResponse,
} = require("../helpers/responses");

const register = async (req, res) => {
    try {
        const { status, message, data } = await registerAdmin(req.body);
        if (status) {
            return sendSuccessResponse(res, message, data, 201);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

const updateAdmin = async (req, res) => {
    try {
        const { status, message, data } = await updateToAdmin(req.body);
        if (status) {
            return sendSuccessResponse(res, message, data, 200);
        }
        return sendErrorResponse(res, message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

module.exports = { register, updateAdmin };
