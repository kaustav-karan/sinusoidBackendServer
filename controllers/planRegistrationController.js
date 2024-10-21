const getAllPlanRegistrations = async (req, res) => {
  try {
    const planRegistrations = await planRegistrationModal.find();
    res.status(200).json(planRegistrations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPlanByRegistrationId = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const planRegistration = await planRegistrationModal.findOne({
      registrationId,
    });
    planRegistration === null
      ? res
          .status(404)
          .json({ code: "404", message: "Plan registration not found" })
      : res.status(200).json(planRegistration);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createPlanRegistration = async (req, res) => {
  try {
      const {
          eventId,
          eventParticipants,
          firstName,
          lastName,
          email,
          phone,
          universityName,
            photoIdUrl } = req.body;
        const registrationId = `${generateRandomID()}OR`; // Generate a unique registrationId
        const newPlanRegistration = new planRegistrationModal({
          registrationId,
            eventId,
            eventParticipants,
            firstName,
            lastName,
            email,
            phone,
            universityName,
            photoIdUrl
        });
        await newPlanRegistration.save();
        res.status(201).json(newPlanRegistration);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePlanRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const updatedPlanRegistration = await planRegistrationModal.findOneAndUpdate(
            { registrationId },
            req.body,
            { new: true }
        );
        res.status(200).json(updatedPlanRegistration);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deletePlanRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;
        await planRegistrationModal.findOneAndDelete({ registrationId });
        res.status(200).json({ message: "Plan registration deleted successfully" });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
  getAllPlanRegistrations,
  getPlanByRegistrationId,
  createPlanRegistration,
  updatePlanRegistration,
  deletePlanRegistration
};