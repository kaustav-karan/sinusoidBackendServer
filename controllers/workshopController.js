const workshopModal = require("../modal/pages/workshopSchema");

const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await workshopModal.find();
    res.json(workshops);
  } catch (error) {
    res.status(400).json({ error });
    console.log({error});
  }
};

const getWorkshopById = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const workshop = await workshopModal.findOne({ workshopId });
    workshop === null
      ? res.status(404).json({ code: "404", message: "Workshop not found" })
      : res.json(workshop);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createWorkshop = async (req, res) => {
  try {
    const {
      published,
      status,
      workshopId,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    } = req.body;
    const newWorkshop = new workshopModal({
      published,
      status,
      workshopId,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    });
    await newWorkshop.save();
    res
      .status(201)
      .json({ code: "200", message: "Workshop created successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const {
      published,
      status,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    } = req.body;
    const updateData = {
      published,
      status,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    };
    const updatedWorkshop = await workshopModal.findOneAndUpdate(
      { workshopId },
      updateData,
      { new: true }
    );
    res.json(updatedWorkshop);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

module.exports = { getAllWorkshops };
