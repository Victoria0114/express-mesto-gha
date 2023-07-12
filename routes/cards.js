const router = require('express').Router();
const { cardIdValidate, cardValidate } = require('../middlewares/validation');

const {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', cardValidate, createCard);
router.delete('/:cardId', cardIdValidate, deleteCard);
router.put('/:cardId/likes', cardIdValidate, putLike);
router.delete('/:cardId/likes', cardIdValidate, deleteLike);

module.exports = router;
