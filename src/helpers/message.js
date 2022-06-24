class Message {
    constructor() {
        this.messages = {
            UNKNOWN_ERROR: "An unknown error occurred",
            REGISTER_SUCCESS: "Successfully registered user",
            REGISTER_FAILED: "Error occured while registering user",
            TOKEN_ERROR: "User token is required",
            INVALID_TOKEN: "Invalid user token provided",
            EMAIL_DUPLICATE: "Email already exists",
            USER_NOT_FOUND: "User not found",
            INVALID_CREDENTIALS: "Invalid sign in credentials",
            LOGIN_SUCCESS: "Successfully logged in",
            UPDATE_SUCCESS: "Successfully updated user",
            USER_QUERY_SUCCESS: "Successfully queried user",
            USER_QUERY_FAILURE: "User does not exist",
            USER_ALREADY_ADMIN: "User is already an admin",
            ADMIN_QUERY_FAILURE: "Admin does not exist",
            ADMIN_QUERY_SUCCESS: "Successfully queried Admin",
            ITEM_UPDATE_SUCCESS: "Successfully updated",
            ITEM_UPDATE_FAILURE: "Item not updated",
            ONLY_ADMIN: "Only Admins are allowed to take this action",
            ONLY_USER: "Only users are allowed take this action",
            BUS_ADDED: "New bus has been successfully added",
            BUS_NOT_FOUND: "Bus not found",
            BUSES_FETCHED: "Buses fetched succesfully",
            ITEM_QUERY_SUCCESS: "Successfully queried item",
            ITEM_QUERY_FAILURE: "Item does not exist",
            TRIP_CREATED: "New trip has been successfully created",
            TRIPS_FETCHED: "Trip(s) fetched succesfully",
            TRIPS_EMPTY: "There is available trips",
        };
    }
    getMessages(key) {
        return this.messages[key];
    }
}

module.exports = new Message();
