const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required(),
  subscription: Joi.string().allow('free', 'pro', 'premium'),
  token: Joi.string().allow(''),
});

const validationMiddleware = schema => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
};

module.exports = {
  registrationValidator: registerSchema,
};
