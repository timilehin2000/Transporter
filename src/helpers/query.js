const { makeResponse } = require("./responses");

const findUserByEmail = async (model, email) => {
    try {
        const findUser = await model.findOne({ email });

        if (!findUser) {
            return makeResponse(false, "USER_QUERY_FAILURE", {});
        }
        return makeResponse(true, "USER_QUERY_SUCCESS", findUser);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const findItemById = async (model, id) => {
    try {
        const findItem = await model.findById({ _id: id });

        if (!findItem) {
            return makeResponse(false, "ITEM_QUERY_FAILURE", {});
        }
        return makeResponse(true, "ITEM_QUERY_SUCCESS", findItem);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const findByEmailAndUpdate = async (model, email, param) => {
    try {
        const updateItem = await model.findOneAndUpdate({ email }, param, {
            new: true,
        });

        if (!updateItem) {
            return makeResponse(false, "ITEM_UPDATE_FAILURE", {});
        }
        return makeResponse(true, "ITEM_UPDATE_SUCCESS", updateItem);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const findItemByIdAndUpdate = async (model, id, param) => {
    try {
        const updateItem = await model.findOneAndUpdate({ _id: id }, param, {
            new: true,
        });

        if (!updateItem) {
            return makeResponse(false, "ITEM_UPDATE_FAILURE", {});
        }
        return makeResponse(true, "ITEM_UPDATE_SUCCESS", updateItem);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const findItemByIdAndDelete = async (Model, id) => {
    try {
        const deletedItem = await Model.findByIdAndDelete({ _id: id });

        if (!deletedItem) {
            return makeResponse(false, "ITEM_QUERY_FAILURE", {});
        }
        return makeResponse(true, "ITEM_DELETE_SUCCESS", deletedItem);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const pagination = (page, limit) => {
    let pageNo = page ? parseInt(page) : 1;
    let pageLimit = limit ? parseInt(limit) : 10;
    let skip = pageNo === 1 ? 0 : (pageNo - 1) * limit;

    return { pageLimit, skip, pageNo };
};

module.exports = {
    findUserByEmail,
    findItemById,
    findByEmailAndUpdate,
    findItemByIdAndDelete,
    findItemByIdAndUpdate,
    pagination,
};
