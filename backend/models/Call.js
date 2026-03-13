const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  caller: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  type: {
    type: String, // 'video' or 'voice'
    enum: ['video', 'voice'],
    default: 'video'
  },
  status: {
    type: String,
    enum: ['missed', 'completed', 'declined', 'busy'],
    default: 'missed'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number // in seconds
  }
});

module.exports = mongoose.model('Call', callSchema);
