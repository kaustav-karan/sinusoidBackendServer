const express = require("express");
const router = express.Router();
const {
  planRegistrationGsheet,
} = require("../controllers/planRegistrationGsheetController");

router.post("/planRegistrationGsheet", planRegistrationGsheet);

module.exports = router;
