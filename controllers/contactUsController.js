const contactUsmodel = require("../modal/pages/contactUsSchema");

const contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, query } = req.body;
    const newContactUs = new contactUsmodel({
      firstName,
      lastName,
      email,
      query,
    });
    await newContactUs.save();
    res.status(201).json(newContactUs);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

module.exports = { contactUs };