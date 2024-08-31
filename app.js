const express = require("express");
const bodyParser = require("body-parser");
const { connectDb } = require("./config/connectDb");
const eventModal = require("./modal/pages/eventSchema");
const workshopModal = require("./modal/pages/workshopSchema");
const volunteerFormModal = require("./modal/pages/volunteerForm");
const sponsorContactModal = require("./modal/pages/sponsorContact");
require("dotenv").config();
const cors = require("cors");
const { google } = require("googleapis");

// Initialize express
const app = express();

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://korpsin.in",
    "https://sinusoid.in",
    "https://cms.sinusoid.in",
  ],
  optionsSuccessStatus: 200,
};

// Enable CORS
app.use(cors(corsOptions));

// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDb({
  mongoUri: process.env.MONGODB_URI,
});

// Google Sheets setup
const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const spreadsheetId = process.env.SPREADSHEET_ID;

// siNUsoid Backend Server Routes

// GET Server status
app.get("/", (req, res) => {
  res.send("Server is up and running...");
});

// POST Volunteer form
app.post("/volunteerapply", async (req, res) => {
  try {
    const formData = req.body;

    const newForm = new volunteerFormModal(formData);
    await newForm.save();

    const client = await auth.getClient();
    const range = "Sheet1!A1";
    const values = [
      [
        formData.name,
        formData.emailId,
        formData.whatsappId,
        JSON.stringify(formData.teams),
        JSON.stringify(formData.qNa),
      ],
    ];
    const resource = { values };
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource,
      auth: client,
    });
    // console.log("Data appended to Google Sheets:", response?.data);

    res
      .status(201)
      .json({ success: "2000", message: "Data saved successfully!" });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error?.response?.data : error?.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST Sponsor contact form
app.post("/sponsorContact", async (req, res) => {
  try {
    const { name, email, phone, companyName } = req.body;
    const newContact = new sponsorContactModal({
      name,
      email,
      phone,
      companyName,
    });
    await newContact.save();
    res.status(201).json({ code: "200", message: "Data saved successfully!" });
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// GET siNUsoid Logo
app.get("/sinulogo", (req, res) => {
  res.sendFile(__dirname + "/public/sinuLogo.png");
});

// GET siNUsoid all Events
app.get("/events", async (req, res) => {
  try {
    const events = await eventModal.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// PUT siNUsoid Modify Event by eventId
app.put("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      _id,
      published,
      status,
      eventName,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
    } = req.body;

    // Create an update object excluding eventId
    const updateData = {
0      _id,
      published,
      status,
      eventName,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
    };

    const updatedEvent = await eventModal.findOneAndUpdate(
      { eventId },
      updateData,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// GET siNUsoid Event by eventId
app.get("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventModal.findOne({
      eventId,
    });
    event === null
      ? res.status(404).json({ code: "404", message: "Event not found" })
      : res.json(event);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// POST siNUsoid Add Event
app.post("/events", async (req, res) => {
  try {
    const {
      _id,
      published,
      status,
      eventId,
      eventName,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
    } = req.body;
    const newEvent = new eventModal({
      _id,
      published,
      status,
      eventId,
      eventName,
      eventTagline,
      shortDesc,
      longDesc,
      schedule,
      note,
      overview,
      rules,
      prizes,
      eventStructure,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// DELETE siNUsoid Delete Event
app.delete("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    await eventModal.findOne
      .findOneAndDelete({
        eventId,
      })
      .exec();
    res.json({ code: "200", message: "Event deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// GET siNUsoid all Workshops
app.get("/workshops", async (req, res) => {
  try {
    const workshops = await workshopModal.find();
    res.json(workshops);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

app.put("/workshops/:workshopId", async (req, res) => {
  try {
    const { workshopId } = req.params;
    const {
      _id,
      published,
      status,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    } = req.body;

    const updateData = {
      _id,
      published,
      status,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    };

    const updatedWorkshop = await workshopModal.findOneAndUpdate(
      { workshopId },
      updateData,
      { new: true }
    );
    res.json(updatedWorkshop);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// PUT siNUsoid Modify Workshop by workshopId
// app.put("/workshops/:workshopId", async (req, res) => {
//   try {
//     const { workshopId } = req.params;
//     const {
//       _id,
//       published,
//       status,
//       workshopName,
//       workshopTagline,
//       description,
//       schedule,
//       collaboration,
//       guidelines,
//     } = req.body;
//     const updatedWorkshop = await workshopModal.findOneAndUpdate(
//       { workshopId },
//       {
//         _id,
//         published,
//         status,
//         workshopName,
//         workshopTagline,
//         description,
//         schedule,
//         collaboration,
//         guidelines,
//       },
//       { new: true }
//     );
//     res.json(updatedWorkshop);
//   } catch (error) {
//     res.status(400).json({ error });
//     console.log({ error });
//   }
// });

// GET siNUsoid Workshop by workshopId
app.get("/workshops/:workshopId", async (req, res) => {
  try {
    const { workshopId } = req.params;
    const workshop = await workshopModal.findOne({
      workshopId,
    });
    workshop === null
      ? res.status(404).json({ code: "404", message: "Workshop not found" })
      : res.json(workshop);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// POST siNUsoid Add Workshop
app.post("/workshops", async (req, res) => {
  try {
    const {
      _id,
      published,
      status,
      workshopId,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    } = req.body;
    const newWorkshop = new workshopModal({
      _id,
      published,
      status,
      workshopId,
      workshopName,
      workshopTagline,
      description,
      schedule,
      collaboration,
      guidelines,
    });
    await newWorkshop.save();
    res.status(201).json(newWorkshop);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// DELETE siNUsoid Delete Workshop
app.delete("/workshops/:workshopId", async (req, res) => {
  try {
    const { workshopId } = req.params;
    await workshopModal.findOne
      .findOneAndDelete({
        workshopId,
      })
      .exec();
    res.json({ code: "200", message: "Workshop deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

// Run server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
