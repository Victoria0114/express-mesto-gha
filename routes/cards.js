const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlCheckPattern } = require('../utils/constants');

const {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

// Маршрут получения всех карточек
router.get('/', getAllCards);

// Маршрут создания новой карточки
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlCheckPattern),
    }),
  }),
  createCard,
);

// Маршрут удаления карточки
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

// Маршрут добавления лайка на карточку
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  putLike,
);

// Маршрут удаления лайка с карточки
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteLike,
);

module.exports = router;
