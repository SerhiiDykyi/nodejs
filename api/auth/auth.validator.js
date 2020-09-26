const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required(),
  subscription: Joi.string().allow('free', 'pro', 'premium'),
  token: Joi.string(),
});

const validationMiddleware = schema => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
  if (error) {
    // const message = error.details.reduce((msg, nextError) => {
    //   if (msg) {
    //     return msg + ', ' + nextError.message;
    //   }
    //   return nextError.message;
    // }, '');
    res.status(400).send('Ошибка от валидационной библиотеки Joi');
  }
  next();
};

module.exports = {
  registrationValidatorMiddleware: validationMiddleware(registerSchema),
};
