const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./database/transporter");
const index = require("./routes/index");

const app = express();

app.use("*", (req, res) => {
    res.status(404).json({
        status: false,
        error: "Lol, You lost your way bro 😥",
    });
});

//handle route here
index(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    connectDb();
});
