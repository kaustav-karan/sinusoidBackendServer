const mongoose = require("mongoose");
const uuid = require("uuid4");

const merchandiseOrderSchema = mongoose.Schema({
  _id: { type: String, required: true, default: uuid() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("merchandiseOrder", merchandiseOrderSchema);
