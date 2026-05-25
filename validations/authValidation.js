const Joi = require('joi');

const loginSchema = Joi.object({
    Username: Joi.string()
        .required(),

    Password: Joi.string()
        .required()
});

module.exports = {
    loginSchema
};