const Conversation = require("../model/conversation.model");

exports.createConversation = async (req, res) => {
  const conversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await conversation.save();
    res.status(201).json({ savedConversation });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCoversation = async (req, res) => {
  const id = req.params.id;

  try {
    const coversation = await Conversation.find({
      members: { $in: [id] },
    });

    res.status(200).json({ coversation });
  } catch (error) {
    res.status(500).json({ error });
  }
};
