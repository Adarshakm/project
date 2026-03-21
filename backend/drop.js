require('dotenv').config();
const mongoose = require('mongoose');

async function dropUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("Connected to MongoDB via drop.js");
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        const usersCollectionExists = collections.some(col => col.name === 'users');

        if (usersCollectionExists) {
            await mongoose.connection.db.dropCollection('users');
            console.log("Dropped 'users' collection successfully.");
        } else {
            console.log("Collection 'users' doesn't exist. Nothing to drop.");
        }
    } catch (e) {
        console.error("Error connecting/dropping collection:", e.message);
    } finally {
        await mongoose.disconnect();
    }
}
dropUsers();
