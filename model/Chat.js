const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user_name : { type: String, default: "", required: true },
  message : { type: String, default: "", required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("chat", chatSchema);