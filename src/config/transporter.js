const mongoose = require("mongoose");

const dbUri = process.env.DATABASE_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log("Database is connected...");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;
