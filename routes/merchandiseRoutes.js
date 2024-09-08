const express = require("express");
const router = express.Router();
const {
  submitMerchandiseOrder,
} = require("../controllers/merchandiseController");

router.post("/merchandiseOrder", submitMerchandiseOrder);

module.exports = router;