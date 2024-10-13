const express = require("express");
const router = express.Router();
const {
  getAllEventRegistrations,
  getEventByRegistrationId,
  createEventRegistration,
  updateEventRegistration,
  deleteEventRegistration,
} = require("../controllers/eventRegistrationController");

router.get("/eventRegistrations", getAllEventRegistrations);

router.get("/eventRegistrations/:registrationId", getEventByRegistrationId);

router.post("/eventRegistrations", createEventRegistration);

router.put("/eventRegistrations/:registrationId", updateEventRegistration);

router.delete("/eventRegistrations/:registrationId", deleteEventRegistration);

module.exports = router;