const SUCCESS_CODE = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// сгенерирован секретный ключ
// через терминал командой из теории
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
const AUTHENTICATION_KEY = 'f6c35f431bd1fc4c1ff1403eeeae3a28e7bca1b419732cb291435484b6af028d';

// регулярное выражение для валидации электронных адресов
const urlCheckPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  SUCCESS_CODE,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  AUTHENTICATION_KEY,
  urlCheckPattern,
};
