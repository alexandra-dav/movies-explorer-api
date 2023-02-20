const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { errorMassage } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: 'name не может быть пустым',
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: 'password не может быть пустым',
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function checkUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(errorMassage.USER_ERROR_UNAUTHORIZED));
        }
        return user;
      }));
};

module.exports = model('user', userSchema);
