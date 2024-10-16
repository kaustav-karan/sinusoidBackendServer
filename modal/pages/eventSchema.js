const mongoose = require("mongoose");

const imgModal = {
  imgUrl: { type: String, required: false },
  imgAlt: { type: String, required: false },
  imgTitle: { type: String, required: false },
};

const eventSchema = mongoose.Schema({
  published: { type: Boolean, default: false },
  status: { type: String, default: "draft" },
  eventId: { type: String, unique: true, required: true },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  eventMode: { type: String, required: true },
  eventRedirectUrl: { type: String, required: false },
  eventParticipants: { type: String, required: true },
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
  imageAsset: {
    listingBanner: imgModal,
    squareBanner: imgModal,
    eventBannerComponent: imgModal,
    addtionalAssets: [imgModal],
  },
  collaboratorDetails: {
    enabled: { type: Boolean, required: false },
    collaboratorBanner: imgModal,
    collaboratorLogo: imgModal,
    collaboratorName: { type: String, required: false },
    collaboratorLink: { type: String, required: false },
    collaboratorDetails: { type: String, required: false },
  },
  note: { type: String, required: false },
  overview: { type: String, required: false, default: "No overview available" },
  eventStructure: [String],
  rules: [String],
  prizes: [String],
});

const eventModal = mongoose.model("events", eventSchema);
module.exports = eventModal;
