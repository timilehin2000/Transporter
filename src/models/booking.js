const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        tripId: {
            type: mongoose.Types.ObjectId,
            ref: "trip",
        },
        seatNumber: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
