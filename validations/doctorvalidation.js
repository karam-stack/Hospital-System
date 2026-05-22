const Joi = require('joi');

const doctorSchema = Joi.object({
    UserID: Joi.number()
        .integer()
        .positive() 
        .required(),

    Specialization: Joi.string()
        .min(3)
        .max(100)
        .trim() 
        .required(),

    ClinicNumber: Joi.number()
        .integer()
        .positive()
        .required()
});

module.exports = doctorSchema;