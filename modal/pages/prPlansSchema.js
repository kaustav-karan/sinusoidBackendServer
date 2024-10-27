const mongoose = require("mongoose");

const prPlanSubSchema = mongoose.Schema({
  varient: { type: String, required: true },
  referralCode: { type: String, required: true },
  ttl: { type: Number, required: false, default: 9999 },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  planType: { type: String, required: true },
  description: [String],
});

// const prPlansSchema = mongoose.Schema({
//   silver: [prPlanSubSchema],
//   gold: [prPlanSubSchema],
//   platinum: [prPlanSubSchema],
// });

const prPlanSubModel = mongoose.model("prPlans", prPlanSubSchema);

module.exports = { prPlanSubModel };
