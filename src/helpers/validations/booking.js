const Joi = require("joi");
const { handleValidationError } = require("../responses");

const createBookingPayloadValidation = (payload) => {
    const schema = Joi.object({
        tripId: Joi.string().required(),
        seatNumber: Joi.string().required(),
    }).required();

    return schema.validate(payload, { allowUnknown: true });
};

const validateCreateBookingPayload = (req, res, next) => {
    const validated = createBookingPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

const deleteBookingPayloadValidation = (payload) => {
    const schema = Joi.object({
        bookingId: Joi.string().required(),
    }).required();

    return schema.validate(payload, { allowUnknown: true });
};

const validateDeletePayloadValidation = (req, res, next) => {
    const validated = deleteBookingPayloadValidation(req.params);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

const updateBookingPayloadValidation = (payload) => {
    const schema = Joi.object({
        bookingId: Joi.string().required(),
    }).required();

    return schema.validate(payload, { allowUnknown: true });
};

const validateUpdatePayloadValidation = (req, res, next) => {
    const validated = updateBookingPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

module.exports = {
    validateCreateBookingPayload,
    validateDeletePayloadValidation,
    validateUpdatePayloadValidation,
};
