const mongoose = require('mongoose');
require('dotenv').config();
//define the MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL // local data base
const mongoURL = process.env.MONGODB_URL;
// set up MongoDB connection
mongoose.connect(mongoURL);
// get the default mongoose.connection
// Mongoose maintains a default connections Object representing the MongoDB connection.
const db = mongoose.connection;
//define event Listners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});
db.on('Disconnected',()=>{
    console.log('Connected to MongoDB server');
});
db.on('error',()=>{
    console.log('Connected to MongoDB server');
});

// Export the databse connection
module.exports = db;