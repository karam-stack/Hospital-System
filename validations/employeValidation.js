const Joi = require('joi');

const createEmployeeSchema = Joi.object({
    UserID: Joi.number()
        .integer()
        .positive()
        .required(),

    Position: Joi.string()
        .max(100)
        .required(),

    HireDate: Joi.date()
        .required()
});

const updateEmployeeSchema = Joi.object({
    Position: Joi.string()
        .max(100)
        .required(),

    HireDate: Joi.date()
        .required()
});

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema
};