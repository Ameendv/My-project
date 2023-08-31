const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  image: String,
  address: String,
  role:String
});

const User = mongoose.model('User', userSchema);
module.exports = User