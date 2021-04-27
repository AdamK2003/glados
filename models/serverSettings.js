const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  levelRedirect: Object,
  levelRedirectID: String
});

module.exports = mongoose.model("ServerSettings", schema);