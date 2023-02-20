const Router = require('express');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { errorMassage } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');

const authorization = require('../middlewares/auth');

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.use('/users', authorization, require('./users'));
router.use('/movies', authorization, require('./movies'));

router.use('*', authorization, (req, res, next) => {
  (next(new NotFoundError(errorMassage.PAGE_NOT_FOUND)));
});

module.exports = router;
