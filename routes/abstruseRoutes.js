const express = require("express");
const router = express.Router();


router.post("/q1001", (req, res) => {
  const { answer } = req.body.userInput;
  if (answer === "sandwich") {
    res.json({ msg: "251c2c33-2a41-4b44-a90d-8127efc7b9a9" });
  } else {
    res.json({ msg: "7171b0e9-7f13-498b-a6ae-c59d99ca7abc" });
  }
});

module.exports = router;