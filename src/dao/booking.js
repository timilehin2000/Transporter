const { findItemById, findItemByIdAndDelete } = require("../helpers/query");
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

const fetchAllBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find({}).sort({ createdAt: -1 });
        if (bookings.length === 0) {
            return makeResponse(true, "BOOKINGS_EMPTY", {});
        }
        return makeResponse(true, "BOOKINGS_FETCHED", bookings);
    } catch (err) {
        console.log(err);
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const deleteBooking = async (payload) => {
    const { bookingId } = payload;

    const { status } = await findItemById(BookingModel, bookingId);
    if (!status) {
        return makeResponse(false, "BOOKING_NOT_FOUND", {});
    }

    try {
        const deletedItem = await findItemByIdAndDelete(
            BookingModel,
            bookingId
        );

        if (deletedItem.status) {
            return makeResponse(true, "BOOKING_DELETED", {});
        }
    } catch (err) {
        console.log(err);
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

module.exports = { addBooking, deleteBooking, fetchAllBookings };
