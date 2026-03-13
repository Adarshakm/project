const mongoose = require('mongoose');
const User = require('./backend/models/User');
require('dotenv').config({ path: './backend/.env' });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/assistance')
  .then(async () => {
    const users = await User.find({});
    console.log('--- ALL USERS ---');
    console.log(users.map(u => ({ email: u.email, role: u.role })));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
