const Joi = require('joi');

const createMedicalRecordSchema = Joi.object({
    PatientID: Joi.number()
        .integer()
        .positive()
        .required(),

    DoctorID: Joi.number()
        .integer()
        .positive()
        .required(),

    Diagnosis: Joi.string()
        .required(),

    TreatmentPlan: Joi.string()
        .required(),

    XRayImagePath: Joi.string()
        .allow('', null)
});

const updateMedicalRecordSchema = Joi.object({

    Diagnosis: Joi.string(),

    TreatmentPlan: Joi.string(),

    XRayImagePath: Joi.string()
        .allow('', null)

}).min(1);

module.exports = {
    createMedicalRecordSchema,
    updateMedicalRecordSchema
};