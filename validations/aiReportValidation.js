const Joi = require('joi');

const createAIReportSchema = Joi.object({
    RecordID: Joi.number()
        .integer()
        .positive()
        .required(),

    ReportText: Joi.string()
        .required()
});

const updateAIReportSchema = Joi.object({
    ReportText: Joi.string()
        .required()
});

module.exports = {
    createAIReportSchema,
    updateAIReportSchema
};