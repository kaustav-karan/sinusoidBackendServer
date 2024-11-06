const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getAttendeeByIdLocal } = require("./attendeesController");

const JWT_SECRET = process.env.JWT_SECRET_SALT_ID_GENERATION;
const JWT_EXPIRATION = "2h";

const getIdCardJWT = async (req, res) => {
  try {
    const user = await getAttendeeByIdLocal(req.params.attendeeId);
    console.log(bcrypt.genSaltSync(10));
    const { attendeeId, firstName, lastName } = user;
    console.log({ attendeeId, firstName, lastName });
    if (user.code === "404") {
      return res
        .status(404)
        .json({ code: "404", message: "Attendee not found" });
    }
    const token = jwt.sign(
      {
        attendeeId: attendeeId,
        firstName: firstName,
        lastName: lastName,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
    console.log({ token });
    return res
      .status(200)
      .json({ code: "200", message: "Token generated successfully", token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const verifyIdCardJWT = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log({ decoded });
    const user = await getAttendeeByIdLocal(decoded.attendeeId);
    console.log({ user });
    if (user.code === "404") {
      return res
        .status(404)
        .json({ code: "404", message: "Attendee not found" });
    } else if (user.code === "400") {
      return res
        .status(400)
        .json({ code: "400", message: "Invalid attendeeId" });
    }
    return res
      .status(200)
      .json({ code: "200", message: "Token verified successfully", user });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

module.exports = { getIdCardJWT, verifyIdCardJWT };
