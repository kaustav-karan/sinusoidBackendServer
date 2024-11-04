const getAccessToken = require("../config/gSheetConfig");
const { google } = require("googleapis");
require("dotenv").config();

async function updatePlanRegistrationSheet(dataArray) {
  try {
    const accessToken = await getAccessToken();

    // Set up OAuth2 client with the access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const sheets = google.sheets({
      version: "v4",
      auth: oauth2Client, // Use OAuth2 client here
    });

    const spreadsheetId = process.env.PLAN_REGISTRATION_SHEET_ID;
    const range = "Sheet1!A2:Z"; // Adjust the range as needed

    const values = dataArray.map((data) => [
      data.registrationId,
      data.planId,
      data.planName,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.universityName,
      data.registrationTime.toLocaleString(),
      data.referralCode,
    ]);

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values },
    });

    // console.log("Sheet updated successfully.");
  } catch (error) {
    console.error("Error updating sheet:", error);
    throw error;
  }
}

module.exports = updatePlanRegistrationSheet;
