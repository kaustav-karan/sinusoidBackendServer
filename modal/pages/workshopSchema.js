const { default: mongoose } = require("mongoose");

const workshopSchema = mongoose.Schema({
  published: { type: Boolean, default: false },
  status: { type: String, default: "draft" },
  workshopId: { type: String, required: true },
  workshopName: { type: String, required: true },
  workshopTagline: { type: String, required: false },
  description: { type: String, required: false },
  schedule: {
    workshopStart: { type: String, required: false },
  },
  collaboration: [
    {
      name: { type: String, required: true },
      link: { type: String, required: false },
      logoSrc: { type: String, required: false },
    },
  ],
  guidelines: [
    {
      info: { type: String, required: true },
      resourceLink: { type: String, required: false },
    },
  ],
});

const workshopModal = mongoose.model("workshops", workshopSchema);
module.exports = workshopModal;
