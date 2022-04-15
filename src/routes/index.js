const userRouter = require("./user");

const index = (app) => {
    app.use("/api/v1/", userRouter);

    app.use("*", (req, res) => {
        res.status(404).json({
            status: false,
            error: "Lol, You lost your way bro 😥",
            route: req.originalUrl,
        });
    });
};

module.exports = index;
