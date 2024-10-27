const marketingComponentModal = require("../modal/pages/marketingComponentSchema");

const getAllMarketingComponents = async (req, res) => {
  try {
    const marketingComponents = await marketingComponentModal.find();
    res.status(200).json(marketingComponents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getMarketingComponentById = async (req, res) => {
  try {
    const { componentId } = req.params;
    const marketingComponent = await marketingComponentModal.findOne({
      componentId,
    });
    marketingComponent === null
      ? res
          .status(404)
          .json({ code: "404", message: "Marketing component not found" })
      : res.status(200).json(marketingComponent);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createMarketingComponent = async (req, res) => {
  try {
    const {
      redirectLink,
      imgSrcLink,
      imgAlt,
      varient,
      content,
      title,
      componentId,
      note,
      ttl,
    } = req.body;
    const newMarketingComponent = new marketingComponentModal({
      redirectLink,
      imgSrcLink,
      imgAlt,
      varient,
      content,
      title,
      componentId,
      note,
      ttl,
    });
    await newMarketingComponent.save();
    res.status(201).json(newMarketingComponent);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
    
  }
};

const updateMarketingComponent = async (req, res) => {
  const { componentId } = req.params;
  const updatedComponent = req.body;
  const updatedMarketingComponent =
    await marketingComponentModal.findOneAndUpdate(
      { componentId },
      updatedComponent,
      { new: true }
    );
  res.status(200).json(updatedMarketingComponent);
};

const deleteMarketingComponent = async (req, res) => {
  const { componentId } = req.params;
  await marketingComponentModal.findOneAndDelete({ componentId });
  res.status(200).json({ message: "Marketing component deleted successfully" });
};

module.exports = {
  getAllMarketingComponents,
  getMarketingComponentById,
  createMarketingComponent,
  updateMarketingComponent,
  deleteMarketingComponent,
};
