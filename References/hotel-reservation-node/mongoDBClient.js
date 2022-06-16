const mongoose = require('mongoose');

// DB config
const db = "mongodb+srv://admin:admin@ooad.z3dt5.mongodb.net/musicsearchEngine";

// Connect to MongoDB
const client = mongoose
                    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true} )
                    .then(console.log('MongoDB Connected'))
                    .catch(err => console.log(err));

module.exports = client;