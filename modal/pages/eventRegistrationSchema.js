const mongoose = require("mongoose");

const eventRegistrationSchema = mongoose.Schema({
  registrationId: { type: String, required: true },
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  eventParticipants: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  universityName: { type: String, required: true },
  isNiitStudent: { type: Boolean, required: true },
  teamMembers: { type: Number, required: true },
  registrationTime: { type: Date, default: Date.now },
  teamDetails: [
    {
      teamMemberName: {
        type: String,
        required: false,
      },
      teamMemberEmail: {
        type: String,
        required: false,
      },
    },
  ],
});

const eventRegistrationModal = mongoose.model(
  "eventRegistrations",
  eventRegistrationSchema
);
module.exports = eventRegistrationModal;
