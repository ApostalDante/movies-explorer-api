const router = require('express').Router();
const { validateCreateUser, validateLogin } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../utils/errors/NotFound');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Сервер не найден'));
});

module.exports = router;
