const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../erorrs/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};


//req.user = payload;
//next();

// /* eslint-disable no-debugger */
// const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('../environment/env');
// const AuthorizationError = require('../errors/authorizationError');

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;
//   try {
//     payload = jwt.verify(token, SECRET_KEY);
//   } catch (e) {
//     const err = new AuthorizationError('Необходима авторизация!');
//     next(err);
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   return next();
// };
