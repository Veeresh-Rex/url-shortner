const mongoose = require('mongoose');

const url = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('urls', url);
