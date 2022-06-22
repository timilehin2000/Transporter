const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        busId: {
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
            type: Date,
            required: true,
        },
        departureTime: {
            type: String,
            required: true,
        },
        fare: {
            type: String,
            required: true,
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
