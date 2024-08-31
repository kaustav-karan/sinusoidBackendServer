const mongoose = require("mongoose");
const uuid = require("uuid4");

const eventSchema = mongoose.Schema({
  _id: { type: String, required: true, default: uuid() },
  published: { type: Boolean, default: false },
  status: { type: String, default: "draft" },
  eventId: { type: String, unique: true, required: true },
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
  eventStructure: [String
  ],
  rules: [String
  ],
  prizes: [String
  ],
});

const eventModal = mongoose.model("events", eventSchema);
module.exports = eventModal;
