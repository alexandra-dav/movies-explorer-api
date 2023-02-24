require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const { errorMassage } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError(errorMassage.USER_ERROR_MUST_AUTHORIZED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(errorMassage.USER_ERROR_MUST_AUTHORIZED);
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
