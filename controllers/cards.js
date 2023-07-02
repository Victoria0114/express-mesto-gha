const Card = require('../models/user');

const { ERROR_CODE } = require('../utils/constsnts');

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(() => {
      res.status(ERROR_CODE.SERVER_ERROR).console.log('На сервере произошла ошибка');
    });
  console.log(req.body);
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });

  console.log(req.user._id);
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Карточка с указанным id не найдена.' });
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при удалении карточки.' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });

  console.log(req.body);
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });

  console.log(req.body);
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятии лайка.' });
      } else {
        res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });

  console.log(req.body);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
