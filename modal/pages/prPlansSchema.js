const mongoose = require("mongoose");

const prPlanSubSchema = mongoose.Schema({
  referralCode: { type: String, required: true },
  name: { type: String, required: true },
  planType: { type: String, required: true },
  varient: { type: String, required: true },
  price: { type: Number, required: true },
  ttl: { type: Number, required: false, default: 9999 },
  description: [String],
});

const prPlanSubModel = mongoose.model("prPlans", prPlanSubSchema);

module.exports = { prPlanSubModel };
