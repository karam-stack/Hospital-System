const Joi = require('joi');

const createRoleSchema = Joi.object({
    RoleName: Joi.string()
        .max(50)
        .required()
});

const updateRoleSchema = Joi.object({
    RoleName: Joi.string()
        .max(50)
}).min(1);

// تم تصحيح الأسماء هنا لتطابق الاستدعاء في الـ Route
module.exports = {
    roleSchema: createRoleSchema, 
    updateRoleSchema
};