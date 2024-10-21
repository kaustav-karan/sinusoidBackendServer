const express = require("express");
const router = express.Router();
const {
  createPlanRegistration,
  getAllPlanRegistrations,
  getPlanByRegistrationId,
  updatePlanRegistration,
  deletePlanRegistration,
} = require("../controllers/planRegistrationController");

router.post("/plan", createPlanRegistration);

router.get("/plan", getAllPlanRegistrations);

router.get("/planRegistration", getPlanByRegistrationId);

router.delete("/plan/:registrationId", deletePlanRegistration);

module.exports = router;
