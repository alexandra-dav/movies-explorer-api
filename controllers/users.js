require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { statusCodeName, errorMassage } = require('../utils/constants');
const User = require('../models/users');
const NotFoundError = require('../errors/not-found-err');
const NoValidationError = require('../errors/no-validation-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

module.exports.showOwner = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(errorMassage.USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NoValidationError(errorMassage.USER_ID_NOT_VALID));
      } else { next(err); }
    });
};
module.exports.updateUserData = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMassage.USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next)
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NoValidationError(errorMassage.USER_NOT_VALID));
      } else { next(err); }
    });
};
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      const {
        name, email,
      } = user;
      res.status(statusCodeName.CREATED).send({
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMassage.USER_ERROR_CONFLICT));
      }
      if (err.name === 'ValidationError') {
        next(new NoValidationError(errorMassage.USER_NOT_VALID));
      } else { next(err); }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorMassage.USER_ERROR_UNAUTHORIZED));
      }
      return User.findUserByCredentials(email, password);
    })
    .then((userData) => {
      const token = jwt.sign(
        { _id: userData._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '1d' },
      );
      res.send({ token });
    })
    .catch(next);
};
