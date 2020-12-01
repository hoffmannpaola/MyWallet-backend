const Joi = require('joi');

const signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const signUp = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    passwordConfirmation: Joi.ref('password'),
});
  

module.exports = {
    signIn,
    signUp,
}; 