const generateRandomID = require("../customFunctions/customIdGenerator");
const { prPlanSubModel } = require("../modal/pages/prPlansSchema");

const getAllPrPlans = async (req, res) => {
  try {
    const prPlans = await prPlanSubModel.find();
    res.status(200).json(prPlans);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllPrPlansByPlanType = async (req, res) => {
  try {
    const prPlans = await prPlanSubModel.find();
    const customResponse = {
      silver: prPlans.filter((plan) => plan.planType === "silver"),
      gold: prPlans.filter((plan) => plan.planType === "gold"),
      platinum: prPlans.filter((plan) => plan.planType === "platinum"),
    };
    res.json(customResponse);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const getPrPlanByReferralCode = async (req, res) => {
  try {
    const { referralCode } = req.params;
    const prPlan = await prPlanSubModel.findOne({ referralCode });
    prPlan === null
      ? res.status(404).json({ code: "404", message: "PR Plan not found" })
      : res.json(prPlan);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const createPrPlan = async (req, res) => {
  try {
    const { varient, ttl, name, planType, price, description } = req.body;
    const referralCode = `${generateRandomID()}PI`;
    const newPrPlan = new prPlanSubModel({
      varient,
      referralCode,
      ttl,
      planType,
      name,
      price,
      description,
    });
    await newPrPlan.save();
    res.status(201).json(newPrPlan);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updatePrPlan = async (req, res) => {
  try {
    const { referralCode } = req.params;
    const { varient, ttl, planType, name, price, description } = req.body;
    const updatedPrPlan = await prPlanSubModel.findOneAndUpdate(
      { referralCode },
      {
        varient,
        ttl,
        planType,
        name,
        price,
        description,
      },
      { new: true }
    );
    res.json(updatedPrPlan);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const patchPrPlan = async (req, res) => {
  try {
    const { referralCode } = req.params;
    const { path } = req.body;
    const updatedPrPlan = await prPlanSubModel.findOneAndUpdate(
      { referralCode },
      {
        path,
      },
      { new: true }
    );
    res.json(updatedPrPlan);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

const deletePrPlan = async (req, res) => {
  try {
    const { referralCode } = req.params;
    const deletedPrPlan = await prPlanSubModel.findOneAndDelete({
      referralCode,
    });
    res.json(deletedPrPlan);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
};

module.exports = {
  getAllPrPlans,
  getAllPrPlansByPlanType,
  getPrPlanByReferralCode,
  createPrPlan,
  updatePrPlan,
  patchPrPlan,
  deletePrPlan,
};
