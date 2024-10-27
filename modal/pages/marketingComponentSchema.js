const mongoose = require("mongoose");

const marketingComponentSchema = {
  redirectLink: { type: String, required: true },
  imgSrcLink: { type: String, required: true },
  imgAlt: { type: String, required: true },
  varient: { type: String, required: true },
  content: { type: String, required: false },
  title: { type: String, required: false },
  componentId: { type: String, required: true },
  note: { type: String, required: false },
  ttl: { type: Number, required: false, default: 1500 },
};

const marketingComponentModal = mongoose.model(
  "marketingComponents",
  marketingComponentSchema
);
module.exports = marketingComponentModal;
