const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  messages: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("messages", MessageSchema);
