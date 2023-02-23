const Router = require('express');
const { login, createUser } = require('../controllers/users');
const { errorMassage } = require('../utils/constants');
const { checkUserDataCreate, checkUserDataSingup } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const authorization = require('../middlewares/auth');

const router = Router();

router.post('/signin', checkUserDataCreate, login);
router.post('/signup', checkUserDataSingup, createUser);

router.use('/users', authorization, require('./users'));
router.use('/movies', authorization, require('./movies'));

router.use('*', authorization, (req, res, next) => {
  (next(new NotFoundError(errorMassage.PAGE_NOT_FOUND)));
});

module.exports = router;
