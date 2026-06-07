const Joi = require('joi');

const createPersonalInfoSchema = Joi.object({
    UserID: Joi.number()
        .integer()
        .positive()
        .required(),

    FullName: Joi.string()
        .max(100)
        .required(),

    Email: Joi.string()
        .email()
        .required(),

    Address: Joi.string()
        .allow('', null),

    DateOfBirth: Joi.date()
        .required(),

    Gender: Joi.string()
        .valid('Male', 'Female')
        .required()
});

const updatePersonalInfoSchema = Joi.object({
    FullName: Joi.string()
        .max(100),

    Email: Joi.string()
        .email(),

    Address: Joi.string()
        .allow('', null),

    DateOfBirth: Joi.date(),

    Gender: Joi.string()
        .valid('Male', 'Female')

}).min(1);
module.exports = {
    createPersonalInfoSchema,
    updatePersonalInfoSchema
};