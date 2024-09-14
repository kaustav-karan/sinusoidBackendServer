const express = require("express");
const router = express.Router();
const {
  getAllWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} = require("../controllers/workshopController");

router.get("/workshops", getAllWorkshops);

router.get("/workshops/:workshopId", getWorkshopById);

router.post("/workshops", createWorkshop);

router.put("/workshops/:workshopId", updateWorkshop);

router.delete("/workshops/:workshopId", deleteWorkshop);

module.exports = router;
