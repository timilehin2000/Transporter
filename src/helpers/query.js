const findUserByEmail = async (Model, email) => {
    return await Model.findOne({ email });
};

module.exports = { findUserByEmail };
