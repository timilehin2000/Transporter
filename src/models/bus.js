const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
    {
        plateNumber: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const BusModel = mongoose.model("Bus", busSchema);

module.exports = BusModel;
