const express = require("express");
const router = express.Router();
const { eventRegistrationGsheet } = require("../controllers/eventRegistrationGsheetController");

router.post("/eventRegistrationGsheet", eventRegistrationGsheet);

module.exports = router;