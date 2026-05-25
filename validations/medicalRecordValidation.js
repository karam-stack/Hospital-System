const Joi = require('joi');

const createMedicalRecordSchema = Joi.object({
    PatientID: Joi.number().integer().positive().required(),

    DoctorID: Joi.number().integer().positive().required(),

    Diagnosis: Joi.string().required(),

    TreatmentPlan: Joi.string().required(),

    XRayImagePath: Joi.string()
        .allow('', null)
});

const updateMedicalRecordSchema =
    createMedicalRecordSchema;

module.exports = {
    createMedicalRecordSchema,
    updateMedicalRecordSchema
};