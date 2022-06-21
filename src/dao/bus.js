const { makeResponse } = require("../helpers/responses");
const BusModel = require("../models/bus");

const addBus = async (payload) => {
    const { plateNumber, capacity, model, manufacturer } = payload;

    const newBus = new BusModel({
        plateNumber,
        capacity,
        model,
        manufacturer,
    });

    try {
        await newBus.save();
        return makeResponse(true, "BUS_ADDED", newBus);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

const getAllBuses = async () => {
    try {
        const buses = await BusModel.find();
        return makeResponse(true, "BUSES_FETCHED", buses);
    } catch (err) {
        return makeResponse(false, "UNKNOWN_ERROR", {});
    }
};

module.exports = { addBus, getAllBuses };
