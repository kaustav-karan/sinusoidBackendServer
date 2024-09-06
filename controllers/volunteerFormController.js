const volunteerFormModal = require("../modal/pages/volunteerForm");
const { google } = require("googleapis");

const submitVolunteerForm = async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new volunteerFormModal(formData);
    await newForm.save();

    // Google Sheets logic here

    res
      .status(201)
      .json({ success: "2000", message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { submitVolunteerForm };
