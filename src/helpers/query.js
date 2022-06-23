const { makeResponse } = require("./responses");

const findUserByEmail = async (Model, email) => {
    try {
        const findUser = await Model.findOne({ email });

        if (!findUser) {
            return makeResponse(false, "USER_QUERY_FAILURE", {});
        }
        return makeResponse(true, "USER_QUERY_SUCCESS", findUser);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const findItemById = async (Model, id) => {
    try {
        const findItem = await Model.findById({ _id: id });

        if (!findItem) {
            return makeResponse(false, "ITEM_QUERY_FAILURE", {});
        }
        return makeResponse(true, "ITEM_QUERY_SUCCESS", findItem);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

function pagination(page, limit) {
    let pageNo = page ? parseInt(page) : 1;
    let pageLimit = limit ? parseInt(limit) : 10;
    let skip = pageNo === 1 ? 0 : (pageNo - 1) * limit;

    return { pageLimit, skip };
}

module.exports = { findUserByEmail, findItemById, pagination };
