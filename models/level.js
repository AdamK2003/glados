const mongoose = require('mongoose')

const levelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  guildID: String,
  exp: Number,
  level: Number
});

module.exports = mongoose.model("Level", levelSchema);