const mongoose = require('mongoose');

const sponsorContact = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String, required: true },
});

module.exports = mongoose.model('sponsorContact', sponsorContact);
