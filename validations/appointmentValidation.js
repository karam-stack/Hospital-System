const Joi = require('joi');

const createAppointmentSchema = Joi.object({
    PatientID: Joi.number().integer().positive().required(),

    DoctorID: Joi.number().integer().positive().required(),

    AppointmentDate: Joi.date()
        .required(),

    Status: Joi.string()
        .valid('Pending', 'Completed', 'Cancelled')
        .required()
});

const updateAppointmentSchema = createAppointmentSchema;

module.exports = {
    createAppointmentSchema,
    updateAppointmentSchema
};