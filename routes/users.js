const router = require('express').Router();

const {
  //createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const { userValidate, userIdValidate, avatarValidate } = require('../middlewares/validation');

//router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:id', userIdValidate, getUser);
router.patch('/me', userValidate, updateUser);
router.patch('/me/avatar', avatarValidate, updateUserAvatar);

module.exports = router;
