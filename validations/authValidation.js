const Joi = require('joi');

const loginSchema = Joi.object({
    Username: Joi.string()
    .min(3)
    .max(50)
    .required(),

Password: Joi.string()
    .min(8)
    .required()
});
module.exports = {
    loginSchema
};