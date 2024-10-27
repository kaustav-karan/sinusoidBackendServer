const { sendMail } = require("../config/connectMail");
const generateRandomID = require("../customFunctions/customIdGenerator");
const planRegistrationModal = require("../modal/pages/planRegistrationSchema");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

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
      planId,
      planName,
      firstName,
      lastName,
      email,
      phone,
      universityName,
      photoIdUrl,
      paymentProofUrl,
      referralCode,
    } = req.body;
    const registrationId = `${generateRandomID()}OR`; // Generate a unique registrationId
    const newPlanRegistration = new planRegistrationModal({
      registrationId,
      planId,
      planName,
      firstName,
      lastName,
      email,
      phone,
      universityName,
      photoIdUrl,
      paymentProofUrl,
      referralCode,
    });
    await newPlanRegistration.save();
    const htmlFilePath = path.join(
      __dirname,
      "../htmlModal/prRegistration.ejs"
    );
    fs.readFile(htmlFilePath, "utf8", (err, template) => {
      if (err) {
        console.log("Error reading file", err);
        return;
      }
      const data = ejs.render(template, {
        name: firstName,
        planName: planName,
        planRegistrationId: registrationId,
      });
      sendMail(
        firstName,
        "Trip to siNUsoid Confirmed",
        email,
        data,
        "You have successfully registered for the siNUsoid"
      );
    });
    res.status(201).json(newPlanRegistration);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePlanRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const updatedPlanRegistration =
      await planRegistrationModal.findOneAndUpdate(
        { registrationId },
        req.body,
        { new: true }
      );
    res.status(200).json(updatedPlanRegistration);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePlanRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    await planRegistrationModal.findOneAndDelete({ registrationId });
    res.status(200).json({ message: "Plan registration deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getAllPlanRegistrations,
  getPlanByRegistrationId,
  createPlanRegistration,
  updatePlanRegistration,
  deletePlanRegistration,
};
