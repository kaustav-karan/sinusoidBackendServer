const sponsorContactModal = require("../modal/pages/sponsorContact");

const submitSponsorContact = async (req, res) => {
  try {
    const { name, email, phone, companyName } = req.body;
    const newContact = new sponsorContactModal({
      name,
      email,
      phone,
      companyName,
    });
    await newContact.save();
    res.status(201).json({ code: "200", message: "Data saved successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { submitSponsorContact };
