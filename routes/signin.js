const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

// Маршрут входа пользователя
router.post(
  '/signin',
  celebrate({
    // Проверка данных с использованием celebrate, Joi
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

module.exports = router;
