const express = require("express");
const router = express.Router();
const {
  registerForPlan,
  getAllRegistrations,
  getAllRegistrationsEmails,
  deletePlanRegistration,
} = require("../controllers/planRegistrationController");

router.post("/plan", registerForPlan);

router.get("/plan", getAllRegistrations);

router.get("/planRegistration", getAllRegistrationsEmails);

router.delete("/plan/:registrationId", deletePlanRegistration);

module.exports = router;
