const mongoose = require("mongoose");

const volunteerFormSchema = mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  whatsappId: { type: String, required: true },
  teams: [
    {
      teamName: { type: String },
      exp: { type: String },
      detailedExperience: { type: String },
    },
  ],
  qNa: [
    {
      question: { type: String },
      answer: { type: String },
    },
  ],
});

const volunteerFormModal = mongoose.model("Form", volunteerFormSchema);
module.exports = volunteerFormModal;
