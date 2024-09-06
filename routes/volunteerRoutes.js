const express = require("express");
const router = express.Router();
const {
  submitVolunteerForm,
} = require("../controllers/volunteerFormController");

router.post("/volunteerapply", submitVolunteerForm);

module.exports = router;
