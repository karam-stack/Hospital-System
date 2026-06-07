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
}).min(1);


module.exports = {
    createAIReportSchema,
    updateAIReportSchema
};