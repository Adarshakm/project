const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get message history between two users
router.get('/:user1/:user2', chatController.getMessageHistory);

module.exports = router;
