const mongoose = require('mongoose');
require('dotenv').config();


const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connect To MongoDB Database');
    }).catch((err) => {
        console.log('MongoDB Not Connected', err);
    });
};

module.exports = { connect }