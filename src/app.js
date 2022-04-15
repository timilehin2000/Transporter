const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./database/transporter");
const index = require("./routes/index");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handle route here
index(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    connectDb();
});

module.exports = app;
