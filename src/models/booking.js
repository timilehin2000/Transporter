const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        bus: {
            type: mongoose.Types.ObjectId,
            ref: "bus",
        },
        trip: {
            type: mongoose.Types.ObjectId,
            ref: "trip",
        },
        seatNumber: {
            type: Number,
        },
    },

    { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
