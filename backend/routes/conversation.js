const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

// Fetch all conversations for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.params.userId] }
    })
    .populate('participants', 'fullName email')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });
    
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversations', error: error.message });
  }
});

// Create a new conversation or get an existing one
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });
    
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId]
      });
      await conversation.save();
    }
    
    const populatedConv = await Conversation.findById(conversation._id).populate('participants', 'fullName email');
    res.status(200).json(populatedConv);
  } catch (error) {
    res.status(500).json({ message: 'Error creating conversation', error: error.message });
  }
});

module.exports = router;
