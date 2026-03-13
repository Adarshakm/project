const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/assistance')
  .then(async () => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    console.log('--- RECENT PRODUCTS ---');
    console.log(JSON.stringify(products, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
