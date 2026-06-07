const Joi = require('joi');

const createUserSchema = Joi.object({
    Username: Joi.string()
        .min(3)
        .max(50)
        .alphanum()
        .required(),

    Password: Joi.string()
        .min(8)
        .required(),

    RoleID: Joi.number()
        .integer()
        .positive()
        .required()
});

const updateUserSchema = Joi.object({
    Username: Joi.string()
        .min(3)
        .max(50)
        .alphanum(),

    Password: Joi.string()
        .min(8),

    RoleID: Joi.number()
        .integer()
        .positive(),

    IsActive: Joi.boolean()

}).min(1);

module.exports = {
    createUserSchema,
    updateUserSchema
};