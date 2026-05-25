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
        .alphanum()
        .required(),

    Password: Joi.string()
        .min(8)
        .optional(),

    RoleID: Joi.number()
        .integer()
        .positive()
        .required(),

    IsActive: Joi.boolean()
        .required()
});

module.exports = {
    createUserSchema,
    updateUserSchema
};