const express = require("express");
const router = express.Router();
const {
  getAllMarketingComponents,
  getMarketingComponentById,
  createMarketingComponent,
  updateMarketingComponent,
  deleteMarketingComponent,
} = require("../controllers/maketingComponentController");

router.get("/marketingComponents", getAllMarketingComponents);

router.get("/marketingComponents/:componentId", getMarketingComponentById);

router.post("/marketingComponents", createMarketingComponent);

router.put("/marketingComponents/:componentId", updateMarketingComponent);

router.delete("/marketingComponents/:componentId", deleteMarketingComponent);

module.exports = router;