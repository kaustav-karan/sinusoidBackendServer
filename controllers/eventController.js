const eventModal = require("../modal/pages/eventSchema");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventModal.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventModal.findOne({ eventId });
    event === null
      ? res.status(404).json({ code: "404", message: "Event not found" })
      : res.json(event);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createEvent = async (req, res) => {
  try {
    const {
      published,
      status,
      eventId,
      eventType,
      eventMode,
      maxTeamMember,
      minTeamMember,
      eventRedirectUrl,
      eventParticipants,
      eventName,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
      imageAsset,
      collaboratorDetails,
    } = req.body;
    const newEvent = new eventModal({
      published,
      status,
      eventId,
      eventType,
      eventMode,
      maxTeamMember,
      minTeamMember,
      eventRedirectUrl,
      eventParticipants,
      eventName,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
      imageAsset,
      collaboratorDetails,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      published,
      status,
      eventName,
      eventType,
      eventMode,
      eventRedirectUrl,
      eventParticipants,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
      imageAsset,
      collaboratorDetails,
    } = req.body;

    const updateData = {
      published,
      status,
      eventName,
      eventType,
      eventMode,
      eventRedirectUrl,
      eventParticipants,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
      imageAsset,
      collaboratorDetails,
    };

    const updatedEvent = await eventModal.findOneAndUpdate(
      { eventId },
      updateData,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    await eventModal.findOneAndDelete({ eventId });
    res.json({ code: "200", message: "Event deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
