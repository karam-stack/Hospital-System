const Joi = require('joi');

const createPrescriptionSchema = Joi.object({
    RecordID: Joi.number()
        .integer()
        .positive()
        .required(),

    Medication: Joi.string()
        .required(),

    Dosage: Joi.string()
        .required(),

    Notes: Joi.string()
        .allow('', null)
});

const updatePrescriptionSchema = Joi.object({
    Medication: Joi.string()
        .required(),

    Dosage: Joi.string()
        .required(),

    Notes: Joi.string()
        .allow('', null)
});

module.exports = {
    createPrescriptionSchema,
    updatePrescriptionSchema
};