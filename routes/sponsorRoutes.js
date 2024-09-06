const express = require("express");
const router = express.Router();
const {
  submitSponsorContact,
} = require("../controllers/sponsorContactController");

router.post("/sponsorContact", submitSponsorContact);

module.exports = router;
