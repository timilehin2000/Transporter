const { registerAdmin } = require("../dao/admin");
const {
    sendSuccessResponse,
    sendErrorResponse,
} = require("../helpers/responses");

const register = async (req, res) => {
    try {
        const createAdmin = await registerAdmin(req.body);
        if (createAdmin.status) {
            return sendSuccessResponse(
                res,
                createAdmin.message,
                createAdmin.data,
                201
            );
        }
        return sendErrorResponse(res, createAdmin.message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, "UKNOWN_ERROR", {}, 500);
    }
};

// const createAdmin = async (req, res) => {};

module.exports = { register };
