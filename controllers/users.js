const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { CREATED } = require('../utils/constants');
const { AUTHENTICATION_KEY } = require('../utils/constants');

function getAllUsers(_, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

function getUser(req, res, next) {
  const { id } = req.params;

  User.findById(id)

    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передача некорректного id'));
      } else {
        next(err);
      }
    });
}

function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(CREATED).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(
            'Пользователь с данным электронным адресом уже зарегистрирован',
          ),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Передача некорректных данные при регистрации пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequestError(
            'Передача некорректных данных при попытке обновления профиля',
          ),
        );
      } else {
        next(err);
      }
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequestError(
            'Передача некорректных данных при попытке обновления аватара',
          ),
        );
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign({ userId }, AUTHENTICATION_KEY, {
          expiresIn: '7d',
        });

        return res.send({ _id: token });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  const { userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передача некорректного id'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
};
