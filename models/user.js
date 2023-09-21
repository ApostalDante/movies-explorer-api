const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../utils/errors/Unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email пользователя введен неверно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Имя пользователя или пароль неверные'));
      }
      return bcrypt.compare(password, user.password).then((data) => {
        if (!data) {
          return Promise.reject(new Unauthorized('Имя пользователя или пароль неверные'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
