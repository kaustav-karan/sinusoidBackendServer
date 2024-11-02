const mongoose = require("mongoose");

const internalAttendeesSchema = mongoose.Schema({
  attendeeId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  lastLocation: { type: String, required: false },
  lastScannedAt: { type: String, required: false },
  lastScannedBy: { type: String, required: false },
});

const externalAttendeesSchema = mongoose.Schema({
  attendeeId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  lastScannedAt: { type: String, required: false },
  lastScannedBy: { type: String, required: false },
  emergencyContact: { type: String, required: false },
});

const internalAttendeesModal = mongoose.model(
  "internalAttendees",
  internalAttendeesSchema
);
const externalAttendeesModal = mongoose.model(
  "externalAttendees",
  externalAttendeesSchema
);
module.exports = { internalAttendeesModal, externalAttendeesModal };
