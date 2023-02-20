const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { showOwner, updateUserData } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
// GET /users/me
router.get('/me', showOwner);

// обновляет информацию о пользователе (email и имя)
// PATCH /users/me
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  }),
}), updateUserData);
