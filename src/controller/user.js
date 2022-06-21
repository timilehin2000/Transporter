const { registerUser, loginUser } = require('../dao/user');
const {
    sendSuccessResponse,
    sendErrorResponse,
} = require('../helpers/responses');

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
        console.log(err);
        return sendErrorResponse(res, 'UKNOWN_ERROR', {}, 500);
    }
};

const login = async (req, res) => {
    try {
        const login = await loginUser(req.body);
        if (login.status) {
            return sendSuccessResponse(res, login.message, login.data, 200);
        }
        return sendErrorResponse(res, login.message, {}, 400);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, 'UKNOWN_ERROR', {}, 500);
    }
};

module.exports = {
    register,
    login,
};
