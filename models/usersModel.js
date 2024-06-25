const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    default: Date.now(),
  },
});

const TestUser = new mongoose.model('TestUser', userSchema);

module.exports = TestUser;
