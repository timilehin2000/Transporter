const { findItemById } = require("../helpers/query");
const { makeResponse } = require("../helpers/responses");
const BookingModel = require("../models/booking");
const TripModel = require("../models/trip");

const addBooking = async (payload, user) => {
    const { tripId, seatNumber } = payload;
    const { _id } = user;

    const { status, message, data } = await findItemById(TripModel, tripId);
    if (!status) {
        return makeResponse(false, "TRIP_NOT_FOUND", {});
    }

    const newBooking = new BookingModel({
        tripId,
        userId: _id,
        seatNumber,
    });

    try {
        await newBooking.save();

        return makeResponse(true, "TRIP_CREATED", newBooking);
    } catch (err) {
        console.log(err);
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

module.exports = addBooking;
