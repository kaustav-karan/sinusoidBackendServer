const mongoose = require("mongoose");
const uuid = require("uuid4");

const eventSchema = mongoose.Schema({
  _id: { type: String, default: uuid() },
  published: { type: Boolean, default: false },
  status: { type: String, default: "draft" },
  eventId: { type: String },
  eventName: { type: String, required: true },
  eventTagline: { type: String, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  schedule: {
    registrationStart: { type: String, required: false },
    registrationEnd: { type: String, required: false },
    eventStart: { type: String, required: false },
    eventEnd: { type: String, required: false },
    submissionStart: { type: String, required: false },
    submissionEnd: { type: String, required: false },
  },
  note: { type: String, required: false },
  overview: { type: String, required: false, default: "No overview available" },
  eventStructure: [
    {
      idx: { type: String, required: false },
      info: { type: String, required: false },
    },
  ],
  rules: [
    {
      idx: { type: String, required: false },
      info: { type: String, required: false },
    },
  ],
  prizes: [
    {
      idx: { type: String, required: false },
      info: { type: String, required: false },
    },
  ],
});

const eventModal = mongoose.model("events", eventSchema);
module.exports = eventModal;
