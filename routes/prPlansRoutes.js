const express = require("express");
const router = express.Router();
const {
  getAllPrPlans,
  getPrPlanByReferralCode,
  createPrPlan,
  updatePrPlan,
  deletePrPlan,
  patchPrPlan,
  getAllPrPlansByPlanType,
} = require("../controllers/prPlansController");

router.get("/plans", getAllPrPlans);

router.get("/plansbytype", getAllPrPlansByPlanType);

router.get("/prplans/:referralCode", getPrPlanByReferralCode);

router.post("/prplans", createPrPlan);

router.put("/prplans/:referralCode", updatePrPlan);

router.patch("/prplans/:referralCode", patchPrPlan);

router.delete("/prplans/:referralCode", deletePrPlan);

module.exports = router;