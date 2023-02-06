const Message = require("../models/messages");

// GET messages
const getMessages = (req, res) => {
  Message.find((err, message) => {
    console.log("in");
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
};
// Create and persist messages
const createMessages = (req, res) => {
  const message = new Message({
    messages: req.body.name,
  });
  Message.save((err, message) => {
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
};

module.exports = {
  getMessages,
  createMessages,
};
