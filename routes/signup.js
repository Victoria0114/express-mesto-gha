const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { urlCheckPattern } = require('../utils/constants');

// Маршрут регистрации нового пользователя
router.post(
  '/signup',
  celebrate({
    // Проверка данных с использованием celebrate, Joi
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlCheckPattern),
    }),
  }),
  createUser,
);

module.exports = router;
