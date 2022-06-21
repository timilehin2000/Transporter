const Joi = require("joi");
const {
    handleValidationError,
    sendErrorResponse,
} = require("../helpers/responses");

const addBusPayloadValidation = (payload) => {
    const schema = Joi.object({
        plateNumber: Joi.string().required(),
        capacity: Joi.number().required(),
        model: Joi.string().required(),
        manufacturer: Joi.string().required(),
    }).required();

    return schema.validate(payload, { allowUnknown: true });
};

const validateAddBusPayload = (req, res, next) => {
    const validated = addBusPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

module.exports = {
    validateAddBusPayload,
};
