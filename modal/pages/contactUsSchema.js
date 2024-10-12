const mongoose = require('mongoose');

const contactUsSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    query: { type: String, required: true },
});
    
const contactUsModal = mongoose.model('contactUsForm', contactUsSchema);
module.exports = contactUsModal;