import Joi from "joi";

const validateRegister = (data) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(10).required().label('password'),
  });

  return Schema.validate(data, { abortEarly: true, allowUnknown: true });
};

const validateLogin = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().label('password'),
  });
  return Schema.validate(data, { abortEarly: true, allowUnknown: true });
};
export {
  validateRegister,
  validateLogin
}