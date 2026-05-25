const Joi = require('joi');

const createPatientSchema = Joi.object({
    UserID: Joi.number()
        .integer()
        .positive()
        .required(),

    BloodType: Joi.string()
        .valid(
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-'
        )
        .required()
});

const updatePatientSchema = Joi.object({
    BloodType: Joi.string()
        .valid(
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-'
        )
        .required()
});

module.exports = {
    createPatientSchema,
    updatePatientSchema
};