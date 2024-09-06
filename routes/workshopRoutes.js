const express = require("express");
const router = express.Router();
const { getAllWorkshops } = require("../controllers/workshopController");

router.get("/workshops", getAllWorkshops);
// Other workshop routes here

module.exports = router;
