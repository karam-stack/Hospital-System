const Joi = require('joi');

const createAppointmentSchema = Joi.object({
    PatientID: Joi.number()
        .integer()
        .positive()
        .required(),

    DoctorID: Joi.number()
        .integer()
        .positive()
        .required(),

    AppointmentDate: Joi.date()
        .required(),

    Status: Joi.string()
        .valid('Pending', 'Completed', 'Cancelled')
        .required()
});

const updateAppointmentSchema = Joi.object({
    PatientID: Joi.number()
        .integer()
        .positive(),

    DoctorID: Joi.number()
        .integer()
        .positive(),

    AppointmentDate: Joi.date(),

    Status: Joi.string()
        .valid('Pending', 'Completed', 'Cancelled')
}).min(1);

module.exports = {
    createAppointmentSchema,
    updateAppointmentSchema
};