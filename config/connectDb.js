const mongoose = require("mongoose");

const connectDb = async ({ mongoUri }) => {
  const mongoDbUri = mongoUri;
  // console.log(mongoDbUri);
  try {
    const dbCon = await mongoose?.connect(mongoDbUri);
    {
      dbCon
        ? console.log("MongoDB Connected")
        : console.log("MongoDB Not Connected");
    }
  } catch (error) {
    console.error("MongoDB connection failed");
  }
};
exports.connectDb = connectDb;
