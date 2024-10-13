const express = require("express");
const bodyParser = require("body-parser");
const { connectDb } = require("./config/connectDb");
require("dotenv").config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Initialize express
const app = express();

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
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

// 1 indicates one layer of proxy (e.g., behind NGINX)
app.set("trust proxy", 1);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 400, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
app.use(limiter);

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
const contactUsRoutes = require("./routes/contactUsRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

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
app.use("/", contactUsRoutes);
app.use("/", eventRegistrationRoutes);

// GET siNUsoid Logo
app.get("/sinulogo", (req, res) => {
  res.sendFile(__dirname + "/public/sinuLogo.png");
});

// Run server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
