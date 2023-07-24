const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlCheckPattern } = require('../utils/constants');

const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

// Все пользователи из базы данных
router.get('/', getAllUsers);

// Пользователь
router.get('/me', getUserInfo);

// Пользователь по его :id
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);

// Редактирование пользователя:
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

// Редактирование аватара
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlCheckPattern),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
