const eventRegistrationModal = require("../modal/pages/eventRegistrationSchema");
const { v4: uuidv4 } = require("uuid");

const getAllEventRegistrations = async (req, res) => {
  try {
    const eventRegistrations = await eventRegistrationModal.find();
    res.status(200).json(eventRegistrations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getEventByRegistrationId = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const eventRegistration = await eventRegistrationModal.findOne({
      registrationId,
    });
    eventRegistration === null
      ? res
          .status(404)
          .json({ code: "404", message: "Event registration not found" })
      : res.status(200).json(eventRegistration);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createEventRegistration = async (req, res) => {
  try {
    const {
      eventId,
      eventParticipants,
      firstName,
      lastName,
      email,
      phone,
      universityName,
      isNiitStudent,
      teamDetails,
    } = req.body;
    const registrationId = uuidv4(); // Generate a unique registrationId
    const newEventRegistration = new eventRegistrationModal({
      registrationId,
      eventId,
      eventParticipants,
      firstName,
      lastName,
      email,
      phone,
      universityName,
      isNiitStudent,
      teamDetails,
    });
    await newEventRegistration.save();
    res.status(201).json(newEventRegistration);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const updateEventRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const updatedEventRegistration =
      await eventRegistrationModal.findOneAndUpdate(
        { registrationId },
        req.body,
        { new: true }
      );
    res.status(200).json(updatedEventRegistration);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const deleteEventRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    await eventRegistrationModal.findOneAndDelete({ registrationId });
    res
      .status(200)
      .json({ message: "Event registration deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

module.exports = {
  getAllEventRegistrations,
  getEventByRegistrationId,
  createEventRegistration,
  updateEventRegistration,
  deleteEventRegistration,
};
