const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { showOwner, updateUserData } = require('../controllers/users');

router.get('/me', showOwner);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
  }),
}), updateUserData);

module.exports = router;
