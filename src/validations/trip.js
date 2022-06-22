const Joi = require("joi");
const { handleValidationError } = require("../helpers/responses");

const createTripPayloadValidation = (payload) => {
    const schema = Joi.object({
        busId: Joi.string().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        tripDate: Joi.date().required(),
        departureTime: Joi.date().required(),
        fare: Joi.string().required(),
    }).required();

    return schema.validate(payload, { allowUnknown: true });
};

const validateCreateTripPayload = (req, res, next) => {
    const validated = createTripPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

module.exports = {
    validateCreateTripPayload,
};
