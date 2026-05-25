const Joi = require('joi');

const roleSchema = Joi.object({
    RoleName: Joi.string()
        .max(50)
        .required()
});

module.exports = {
    roleSchema
};