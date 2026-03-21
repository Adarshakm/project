const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Add a new message
router.post('/', async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMessage = new Message({ conversationId, sender, text });
    await newMessage.save();

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id
    });

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error saving message', error: error.message });
  }
});

// Get messages for a conversation
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

module.exports = router;
