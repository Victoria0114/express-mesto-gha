const express = require('express');
const mongoose = require('mongoose');

const { ERROR_CODE } = require('./utils/constsnts');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb');
console.log('Connected to db');

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '649d6d1a759ddbd827b0d76c' };
  next();
});

app.use('/', router);

app.use((req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'Что-то сломалось' });
  next();
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
  console.log(`App listening on port ${PORT}`);
});
