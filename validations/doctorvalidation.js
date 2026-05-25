const Joi = require('joi');

const createDoctorSchema = Joi.object({
    UserID: Joi.number()
        .integer()
        .positive()
        .required(),

    Specialization: Joi.string()
        .max(100)
        .required(),

    ClinicNumber: Joi.string()
        .max(20)
        .required()
});

const updateDoctorSchema = Joi.object({
    Specialization: Joi.string()
        .max(100)
        .required(),

    ClinicNumber: Joi.string()
        .max(20)
        .required()
});

module.exports = {
    createDoctorSchema,
    updateDoctorSchema
};