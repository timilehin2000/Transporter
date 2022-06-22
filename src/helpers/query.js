const { makeResponse } = require("./responses");

const findUserByEmail = async (Model, email) => {
    try {
        const findUser = await Model.findOne({ email });

        if (!findUser) {
            return makeResponse(false, "USER_QUERY_FAILURE", {});
        }
        return makeResponse(true, "USER_QUERY_SUCCESS", findUser);
    } catch {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const findItemById = async (Model, id) => {
    return await Model.findById({ _id: id });
};

module.exports = { findUserByEmail, findItemById };
