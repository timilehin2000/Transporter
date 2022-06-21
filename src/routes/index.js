const userRouter = require("./user");
const adminRouter = require("./admin");

const index = (app) => {
    app.use("/api/v1/", userRouter);
    app.use("/api/v1", adminRouter);

    app.use("*", (req, res) => {
        res.status(404).json({
            status: false,
            error: "Lol, You lost your way bro 😥",
            route: req.originalUrl,
        });
    });
};

module.exports = index;
