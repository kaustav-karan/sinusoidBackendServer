const express = require("express");
const bodyParser = require("body-parser");
const { connectDb } = require("./config/connectDb");
const eventModal = require("./modal/eventSchema");
const volunteerFormModal = require("./modal/pages/volunteerForm");
require("dotenv").config();
const cors = require("cors");
const { google } = require("googleapis");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://korpsin.in",
    "https://sinusoid.in",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

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

app.get("/", (req, res) => {
  res.send("Server is up and running...");
});

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

app.get("/event/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventModal.findOne({
      eventId,
    });
    event === null
      ? res.status(404).json({ code: "404", message: "Event not found" })
      : res.json(...event, (code = "200"));
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

app.get('/merch/:amount', (req, res) => {
  res.redirect(`upi://pay?pa=kaustavkaran2015@okicici&am=${amount}&cu=INR`);
});

app.post("/event", async (req, res) => {
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

app.put("/event/:eventId", async (req, res) => {
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
    const updatedEvent = await eventModal.findOneAndUpdate(
      { eventId },
      {
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
      },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error });
    console.log({ error });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
