const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getAttendeeByIdLocal } = require("./attendeesController");

const JWT_SECRET = process.env.JWT_SECRET_SALT_ID_GENERATION;
const JWT_EXPIRATION = "2h";

const getIdCardJWT = async (req, res) => {
  try {
    const user = await getAttendeeByIdLocal(req.params.attendeeId);
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
  const { token, venueId } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getAttendeeByIdLocal(decoded.attendeeId);
    const { attendeeId, firstName, lastName } = user;
    const name = `${firstName} ${lastName}`;
    if (user.code === "404") {
      return res
        .status(404)
        .json({ code: "404", message: "Attendee not found" });
    } else if (user.code === "400") {
      return res
        .status(400)
        .json({ code: "400", message: "Invalid attendeeId" });
    }
    // Log the user entry
    const log = new logModal({
      attendeeId,
      venueId,
      name,
      entryTime: new Date(),
    });
    await log.save();
    return res.status(200).json({
      code: "200",
      message: "Token verified successfully",
      name,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

module.exports = { getIdCardJWT, verifyIdCardJWT };
