const express = require("express");
const bodyParser = require("body-parser");
const { connectDb } = require("./config/connectDb");
require("dotenv").config();
const cors = require("cors");

// Initialize express
const app = express();

// CORS options
const corsOptions = {
  origin: [
    /^http:\/\/localhost:\d+$/,
    "https://abstruse.sinusoid.in",
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

// Route Files
const eventRoutes = require("./routes/eventRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const workshopRoutes = require("./routes/workshopRoutes");
const hackathonRegistrationRoutes = require("./routes/hackathonRegistrationsRoute");
const merchandiseRoutes = require("./routes/merchandiseRoutes");
const imageRoutes = require("./routes/imagesRoutes");
const abstruseRoutes = require("./routes/abstruseRoutes");

// siNUsoid Backend Server Public Routes
app.get("/", (req, res) => {
  res.send("Server is up and running...");
});
app.use("/", volunteerRoutes);
app.use("/", sponsorRoutes);
app.use("/", merchandiseRoutes);
app.use("/", eventRoutes);
app.use("/", workshopRoutes);
app.use("/", hackathonRegistrationRoutes);
app.use("/", imageRoutes);
app.use("/", abstruseRoutes);

// GET siNUsoid Logo
app.get("/sinulogo", (req, res) => {
  res.sendFile(__dirname + "/public/sinuLogo.png");
});

// Run server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
