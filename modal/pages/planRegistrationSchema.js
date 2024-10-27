const mongoose = require("mongoose");

const planRegistrationSchema = mongoose.Schema({
  registrationId: { type: String, required: true },
  planId: { type: String, required: true },
  planName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  universityName: { type: String, required: true },
  registrationTime: { type: Date, default: Date.now },
  photoIdUrl: { type: String, required: true },
  paymentProofUrl: { type: String, required: true },
  referralCode: { type: String, required: false },
});

const planRegistrationModal = mongoose.model(
  "planRegistrations",
  planRegistrationSchema
);

module.exports = planRegistrationModal;
