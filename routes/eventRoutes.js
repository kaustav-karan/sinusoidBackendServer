const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/events", getAllEvents);

router.get("/events/:eventId", getEventById);

router.post("/events", createEvent);

router.put("/events/:eventId", updateEvent);

router.delete("/events/:eventId", deleteEvent);

module.exports = router;
