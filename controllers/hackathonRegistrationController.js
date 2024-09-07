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

module.exports = { registerForHackathon };
