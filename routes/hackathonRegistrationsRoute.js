const express = require("express");
const router = express.Router();
const { registerForHackathon } = require("../controllers/hackathonRegistrationController");

router.post("/hackathon", registerForHackathon);

module.exports = router;