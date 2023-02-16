const Joi = require("@hapi/joi");

exports.account = {
  body: Joi.object().keys({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required().min(5),
    roles: Joi.array().items(Joi.string()),
  }),
};
