const { celebrate, Joi } = require('celebrate');

const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email()
      .required(),
    password: Joi.string()
      .required(),
    name: Joi.string().min(2).max(30)
      .required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    email: Joi.string().email()
      .required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required(),
    director: Joi.string()
      .required(),
    duration: Joi.number()
      .required(),
    year: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    image: Joi.string().pattern(regex)
      .required(),
    trailerLink: Joi.string().pattern(regex)
      .required(),
    thumbnail: Joi.string().pattern(regex)
      .required(),
    movieId: Joi.number()
      .required(),
    nameRU: Joi.string()
      .required(),
    nameEN: Joi.string()
      .required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
  validateCreateMovie,
  validateMovieId,
};
