const mongoose = require("mongoose");

const planRegistrationSchema = mongoose.Schema({
  registrationId: { type: String, required: true },
  eventId: { type: String, required: true },
  eventParticipants: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  universityName: { type: String, required: true },
  registrationTime: { type: Date, default: Date.now },
  photoIdUrl: { type: String, required: true },
});

const planRegistrationModal = mongoose.model(
  "planRegistrations",
  planRegistrationSchema
);

module.exports = planRegistrationModal;
