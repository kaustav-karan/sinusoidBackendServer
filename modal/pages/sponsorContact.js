const mongoose = require('mongoose');
const uuid = require('uuid4');

const sponsorContact = mongoose.Schema({
  _id: { type: String, required: true, default: uuid() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String, required: true },
});

module.exports = mongoose.model('sponsorContact', sponsorContact);
