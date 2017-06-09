const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Укажите имя'
  },
  surname: {
    type: String,
    required: 'Укажите фамилию'
  },
  email: {
    type: String,
    required: 'Укажите e-mail',
    unique: 'Такой e-mail уже существует',
    index: true
  },
  password: {
    type: String,
    required: 'Укажите пароль'
  },
  passwordHash: String, // TODO: хеширование паролей пока не реализованно
  salt: String,
}, {
  timestamps: true
});


userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.password) return false;
  return this.password === password;
};

module.exports = mongoose.model('User', userSchema);
