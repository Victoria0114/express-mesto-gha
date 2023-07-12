const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const { userValidate, userIdValidate, avatarValidate } = require('../middlewares/validation');

router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:id', userIdValidate, getUser);
router.patch('/me', userValidate, updateUser);
router.patch('/me/avatar', avatarValidate, updateUserAvatar);

module.exports = router;
