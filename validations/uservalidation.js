const Joi = require('joi');

const userSchema = Joi.object({
    Username: Joi.string()
        .min(3)
        .max(50)
        .alphanum() 
        .required()
        .messages({
            'string.min': 'يجب أن يكون اسم المستخدم 3 حروف على الأقل',
            'any.required': 'اسم المستخدم حقل مطلوب'
        }),

    Password: Joi.string()
        .min(8) 
        .max(100)
      
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'كلمة المرور ضعيفة! يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص واحد على الأقل.',
            'string.min': 'يجب أن تكون كلمة المرور 8 خانات على الأقل'
        }),

    RoleID: Joi.number()
        .integer()
        .positive()
        .required()
});

module.exports = userSchema;