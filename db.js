const mongoose = require('mongoose');
//define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/Hotels'
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