const updateSheet = require("../customFunctions/eventRegistrationUpdateFunction");
const eventRegistrationModal = require("../modal/pages/eventRegistrationSchema");

const eventRegistrationGsheet = async (req, res) => {
  try {
    const newData = await eventRegistrationModal.find();

    // Check and log the type of newData
    // console.log("Data fetched from database:", newData);

    // Ensure newData is an array before passing it
    if (!Array.isArray(newData)) {
      throw new Error(
        "Expected an array from database query, but got something else."
      );
    }

    await updateSheet(newData);
    res.status(200).json({ message: "Sheet updated successfully" });
  } catch (error) {
    console.error("Error updating sheet:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { eventRegistrationGsheet };
