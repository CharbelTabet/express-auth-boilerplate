const Joi = require('@hapi/joi');

// Login Validation
const loginValidation = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string().min(8).required(),
})

module.exports = {
    login: loginValidation,
}
