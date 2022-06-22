const { findItemById } = require("../helpers/query");
const { makeResponse } = require("../helpers/responses");
const BusModel = require("../models/bus");
const TripModel = require("../models/trip");

const addTrip = async (payload) => {
    const { busId, origin, destination, tripDate, departureTime, fare } =
        payload;

    const findBus = findItemById(BusModel, busId);

    const newTrip = new TripModel({
        busId,
        origin,
        destination,
        tripDate,
        departureTime,
        fare,
        status: "Active",
    });

    try {
        await newBus.save();
        return makeResponse(true, "TRIP_CREATED", newTrip);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

module.exports = { addTrip };
