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
    Medication: Joi.string(), // أصبحت اختيارية عند التعديل
    Dosage: Joi.string(),     // أصبحت اختيارية عند التعديل
    Notes: Joi.string()
        .allow('', null)
}).min(1);

module.exports = {
    createPrescriptionSchema,
    updatePrescriptionSchema
};