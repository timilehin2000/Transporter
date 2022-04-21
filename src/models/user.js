const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (password) {
    const user = this;

    return bcrypt.compare(password, user.password).catch((e) => false);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
