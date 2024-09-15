const express = require("express");
const router = express.Router();
const {
  registerForHackathon,
  getAllRegistrations,
  getAllRegistrationsEmails,
} = require("../controllers/hackathonRegistrationController");

router.post("/hackathon", registerForHackathon);

router.get("/hackathon", getAllRegistrations);

router.get("/hackathonRegistration", getAllRegistrationsEmails);

module.exports = router;
