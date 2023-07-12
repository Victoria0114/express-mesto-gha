const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes');
const error = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
console.log('Connected to db');

app.use(helmet());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('Сервер запущен');
  console.log(`App listening on port ${PORT}`);
});
