const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ERROR_CODE } = require('./utils/constsnts');
const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb');
console.log('Connected to db');

app.use(express.json());
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  req.user = {_id: '649d6d1a759ddbd827b0d76c'};
  next();
});

app.use('/', (req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log("Сервер запущен");
  console.log(`App listening on port ${PORT}`);
})









// // Устанавливаем точку входа
// // const express = require('express');

// // const app = express();
// // создали express-приложение.

// const express = require('express');

// // Слушаем 3000 порт
// const { PORT = 3000 } = process.env;

// const mongoose = require('mongoose');

// const app = express();


// // подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });

// // подключаем мидлвары, роуты и всё остальное...

// app.listen(PORT, () => {
//     // Если всё работает, консоль покажет, какой порт приложение слушает
//     console.log(`App listening on port ${PORT}`)
// })

