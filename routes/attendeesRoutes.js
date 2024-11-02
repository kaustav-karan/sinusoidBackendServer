const express = require("express");
const router = express.Router();

const {
  getAllAttendees,
  getAttendeeById,
  createInternalAttendee,
  createExternalAttendee,
  updateAttendee,
  patchAttendee,
  deleteAttendee,
} = require("../controllers/attendeesController");

// Get all attendees
router.get("/attendee", getAllAttendees);

// Get attendee by id
router.get("/attendee/:attendeeId", getAttendeeById);

// Create internal attendee
router.post("/attendee/internal", createInternalAttendee);

// Create external attendee
router.post("/attendee/external", createExternalAttendee);

// Update attendee
router.put("/attendee/:attendeeId", updateAttendee);

// Patch attendee
router.patch("/attendee/:attendeeId", patchAttendee);

// Delete attendee
router.delete("/attendee/:attendeeId", deleteAttendee);

module.exports = router;