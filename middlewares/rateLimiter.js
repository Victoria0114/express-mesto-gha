const rateLimiter = require('express-rate-limit');

// Ограничиваем запросы
const limiter = rateLimiter({

  max: 100,

  windowMS: 45000,

  message: 'Превышено количество запросов на сервер. Попробуйте повторить немного позже',
});

module.exports = limiter;
