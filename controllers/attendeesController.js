const generateRandomID = require("../customFunctions/customIdGenerator");
const {
  internalAttendeesModal,
  externalAttendeesModal,
} = require("../modal/pages/attendeesSchema");

const getAllAttendees = async (req, res) => {
  try {
    const internalAttendees = await internalAttendeesModal.find();
    const externalAttendees = await externalAttendeesModal.find();
    res.json([...internalAttendees, ...externalAttendees]);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const getAttendeeById = async (req, res) => {
  try {
    const { attendeeId } = req.params;
    const attendeeType = attendeeId.slice(-2);
    if (attendeeType === "IR") {
      const internalAttendee = await internalAttendeesModal.findOne({
        attendeeId,
      });
      internalAttendee === null
        ? res.status(404).json({ code: "404", message: "Attendee not found" })
        : res.json(internalAttendee);
    } else if (attendeeType === "OR") {
      const externalAttendee = await externalAttendeesModal.findOne({
        attendeeId,
      });
      externalAttendee === null
        ? res.status(404).json({ code: "404", message: "Attendee not found" })
        : res.json(externalAttendee);
    } else {
      res.status(400).json({ code: "400", message: "Invalid attendeeId" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createInternalAttendee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      emailId,
      lastLocation,
      lastScannedAt,
      lastScannedBy,
    } = req.body;
    const attendeeId = `${generateRandomID()}IR`;
    const internalAttendee = new internalAttendeesModal({
      attendeeId,
      firstName,
      lastName,
      contactNumber,
      emailId,
      lastLocation,
      lastScannedAt,
      lastScannedBy,
    });
    await internalAttendee.save();
    res.json({ code: "201", message: "Attendee created" });
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createExternalAttendee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      emailId,
      lastScannedAt,
      lastScannedBy,
      emergencyContact,
    } = req.body;
    const attendeeId = `${generateRandomID()}OR`;
    const externalAttendee = new externalAttendeesModal({
      attendeeId,
      firstName,
      lastName,
      contactNumber,
      emailId,
      lastScannedAt,
      lastScannedBy,
      emergencyContact,
    });
    await externalAttendee.save();
    res.json({ code: "201", message: "Attendee created" });
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const updateAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.params;
    const attendeeType = attendeeId.slice(-2);
    if (attendeeType === "IR") {
      const internalAttendee = await internalAttendeesModal.findOne({
        attendeeId,
      });
      if (internalAttendee === null) {
        res.status(404).json({ code: "404", message: "Attendee not found" });
      } else {
        const {
          firstName,
          lastName,
          contactNumber,
          emailId,
          lastLocation,
          lastScannedAt,
          lastScannedBy,
        } = req.body;
        await internalAttendeesModal.updateOne(
          { attendeeId },
          {
            firstName,
            lastName,
            contactNumber,
            emailId,
            lastLocation,
            lastScannedAt,
            lastScannedBy,
          }
        );
        res.json({ code: "200", message: "Attendee updated" });
      }
    } else if (attendeeType === "OR") {
      const externalAttendee = await externalAttendeesModal.findOne({
        attendeeId,
      });
      if (externalAttendee === null) {
        res.status(404).json({ code: "404", message: "Attendee not found" });
      } else {
        const {
          firstName,
          lastName,
          contactNumber,
          emailId,
          lastScannedAt,
          lastScannedBy,
          emergencyContact,
        } = req.body;
        await externalAttendeesModal.updateOne(
          { attendeeId },
          {
            firstName,
            lastName,
            contactNumber,
            emailId,
            lastScannedAt,
            lastScannedBy,
            emergencyContact,
          }
        );
        res.json({ code: "200", message: "Attendee updated" });
      }
    } else {
      res.status(400).json({ code: "400", message: "Invalid attendeeId" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const patchAttendee = async (req, res) => {
  try {
    const { attendeeId, lastScannedAt, lastScannedBy } = req.body;
    const attendeeType = attendeeId.slice(-2);
    if (attendeeType === "IR") {
      const internalAttendee = await internalAttendeesModal.findOne({
        attendeeId,
      });
      if (internalAttendee === null) {
        res.status(404).json({ code: "404", message: "Attendee not found" });
      } else {
        await internalAttendeesModal.updateOne(
          { attendeeId },
          {
            lastScannedAt,
            lastScannedBy,
          }
        );
        res.json({ code: "200", message: "Attendee updated" });
      }
    } else if (attendeeType === "OR") {
      const externalAttendee = await externalAttendeesModal.findOne({
        attendeeId,
      });
      if (externalAttendee === null) {
        res.status(404).json({ code: "404", message: "Attendee not found" });
      } else {
        await externalAttendeesModal.updateOne(
          { attendeeId },
          {
            lastScannedAt,
            lastScannedBy,
          }
        );
        res.json({ code: "200", message: "Attendee updated" });
      }
    } else {
      res.status(400).json({ code: "400", message: "Invalid attendeeId" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const deleteAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.params;
    const attendeeType = attendeeId.slice(-2);
    if (attendeeType === "IR") {
      const internalAttendee = await internalAttendeesModal.findOne({
        attendeeId,
      });
      if (internalAttendee === null) {
        res.status(404).json({ code: "404", message: "Attendee not found" });
      } else {
        await internalAttendeesModal.deleteOne({ attendeeId });
        res.json({ code: "200", message: "Attendee deleted" });
      }
    } else if (attendeeType === "OR") {
      const externalAttendee = await externalAttendeesModal.findOne({
        attendeeId,
      });
      if (externalAttendee === null) {
        res.status(404).json({ code: "404", message: "Attendee not found" });
      } else {
        await externalAttendeesModal.deleteOne({ attendeeId });
        res.json({ code: "200", message: "Attendee deleted" });
      }
    } else {
      res.status(400).json({ code: "400", message: "Invalid attendeeId" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

module.exports = {
  getAllAttendees,
  getAttendeeById,
  createInternalAttendee,
  createExternalAttendee,
  updateAttendee,
  patchAttendee,
  deleteAttendee,
};
