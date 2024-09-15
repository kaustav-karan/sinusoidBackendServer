const express = require("express");
const router = express.Router();
const {
  registerForHackathon,
  getAllRegistrations,
} = require("../controllers/hackathonRegistrationController");

router.post("/hackathon", registerForHackathon);

router.get("/hackathon", getAllRegistrations);

module.exports = router;
