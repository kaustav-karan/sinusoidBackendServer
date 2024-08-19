const mongoose = require('mongoose');

const about = mongoose.Schema({
    content: String,
    refId: String,
    email: String
});

module.exports = mongoose.model('about', about);