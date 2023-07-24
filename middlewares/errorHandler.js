// импорт ошибки 500
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

// Middleware обработки ошибок
const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR; // Определяем статус код ошибки

  // Cообщение об ошибке в зависимости от статус кода
  const message = statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
