const { findItemById } = require("../helpers/query");
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

    let pageNo = page ? parseInt(page) : 1;
    let pageLimit = limit ? parseInt(limit) : 10;
    let skip = pageNo === 1 ? 0 : (pageNo - 1) * limit;

    try {
        const trips = await TripModel.find(filter)
            .sort({
                createdAt: -1,
                tripDate: -1,
            })
            .skip(skip)
            .limit(pageLimit);

        return makeResponse(true, "TRIPS_FETCHED", {
            next: pageNo + 1,
            previous: pageNo === 1 ? 0 : pageNo - 1,
            trips,
        });
    } catch (err) {
        console.log(err);
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

module.exports = { addTrip, fetchAllTrips };
