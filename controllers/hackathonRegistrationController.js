const hackathonModal = require("../modal/pages/hackathonSchema");

const registerForHackathon = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      phoneNumber,
      collegeName,
      teamName,
      noOfTeamMembers,
      teamMembers,
    } = req.body;
    const newHackathon = new hackathonModal({
      firstName,
      lastName,
      emailId,
      phoneNumber,
      collegeName,
      teamName,
      noOfTeamMembers,
      teamMembers,
    });
    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await hackathonModal.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(404).json({ error });
    console.log({ error });
  }
};

const getAllRegistrationsEmails = async (req, res) => {
  try {
    const registrations = await hackathonModal.find();
    const emails = registrations.map((registration) => registration.emailId);
    res.status(200).json(emails);
  } catch (error) {
    res.status(404).json({ error });
    console.log({ error });
  }
};

module.exports = { registerForHackathon, getAllRegistrations, getAllRegistrationsEmails };
