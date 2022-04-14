const Joi = require("joi");
const { handleValidationError } = require("../utils/responses");

const registerPayloadValidation = (payload) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
    }).required();
    return schema.validate(payload, { allowUnknown: true });
};

const validateRegisterPayload = (req, res, next) => {
    const validated = registerPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

const loginPayloadValidation = (payload) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).required();
    return schema.validate(payload, { allowUnknown: true });
};

const validateLoginPayload = (req, res, next) => {
    const validated = loginPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(validated, res);
    }
    return next();
};

module.exports = {
    validateRegisterPayload,
    validateLoginPayload,
};
