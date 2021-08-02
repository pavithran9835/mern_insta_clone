const Message = require("../model/message.model");

exports.createMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json({ savedMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.find({ conversationId: id });
    res.status(201).json({ messages });
  } catch (error) {
    res.status(500).json({ error });
  }
};
