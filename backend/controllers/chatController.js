const Message = require('../models/Message');

exports.getMessageHistory = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    // Fetch messages where sender is user1 AND receiver is user2
    // OR sender is user2 AND receiver is user1
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 }); // Sort chronologically

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching message history:', error);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
};
