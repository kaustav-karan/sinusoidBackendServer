const merchandiseOrderSchema = require('../modal/pages/merchandiseOrderSchema');

const submitMerchandiseOrder = async (req, res) => {
  try {
    const { name, email, phone, address, order } = req.body;
    const newOrder = new merchandiseOrderSchema({
      name,
      email,
      phone
    });
    await newOrder.save();
    res.status(201).json({ code: "200", message: "Data saved successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = { submitMerchandiseOrder };