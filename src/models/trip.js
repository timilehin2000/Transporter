const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        bus: {
            type: mongoose.Types.ObjectId,
            ref: "bus",
        },
        origin: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        tripDate: {
            type: String,
            required: true,
        },
        departureTime: {
            type: String,
            required: true,
        },
        fare: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["Active", "Cancelled"],
        },
    },

    { timestamps: true }
);

const TripModel = mongoose.model("Trip", tripSchema);

module.exports = TripModel;
