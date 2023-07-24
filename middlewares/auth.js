const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { AUTHENTICATION_KEY } = require('../utils/constants');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  const errorMes = 'Неправильные почта или пароль';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError(`${errorMes}(${authorization})!`));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, AUTHENTICATION_KEY);
  } catch (err) {
    return next(new UnauthorizedError(`${errorMes}!`));
  }

  req.user = payload;

  return next();
};
