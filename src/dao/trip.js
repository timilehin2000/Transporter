const { findItemById, pagination } = require("../helpers/query");
const { makeResponse } = require("../helpers/responses");
const BusModel = require("../models/bus");
const TripModel = require("../models/trip");

const addTrip = async (payload) => {
    const { busId, origin, destination, tripDate, departureTime, fare } =
        payload;

    const { status, message, data } = await findItemById(BusModel, busId);

    if (!status) {
        return makeResponse(false, "BUS_NOT_FOUND", {});
    }

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
        await newTrip.save();
        return makeResponse(true, "TRIP_CREATED", newTrip);
    } catch (err) {
        console.log(err);
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const fetchAllTrips = async (payload) => {
    const { page, limit, origin, destination } = payload;

    let filter = {};

    if (origin) {
        filter.origin = origin;
    }
    if (destination) {
        filter.destination = destination;
    }

    const { pageLimit, skip, pageNo } = pagination(page, limit);

    try {
        const trips = await TripModel.find(filter)
            .sort({
                createdAt: -1,
                tripDate: -1,
            })
            .skip(skip)
            .limit(pageLimit);

        if (trips.length === 0) {
            return makeResponse(true, "TRIPS_EMPTY", {});
        }

        return makeResponse(true, "TRIPS_FETCHED", trips);
    } catch (err) {
        console.log(err);
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const cancelTrip = (module.exports = { addTrip, fetchAllTrips });
