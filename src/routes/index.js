const userRouter = require("./user");

const index = (app) => {
    app.use("/auth", userRouter);
};

module.exports = index;
