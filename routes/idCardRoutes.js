const express = require("express");
const router = express.Router();

const {
    getIdCardJWT,
    verifyIdCardJWT,
} = require("../controllers/idCardController");
    
// Get id card JWT
router.get("/idCard/:attendeeId", getIdCardJWT);

// Verify id card JWT
router.post("/idCard/verify", verifyIdCardJWT);

module.exports = router;