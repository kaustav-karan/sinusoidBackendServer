const { google } = require("googleapis");
const getAccessToken = require("../config/gSheetConfig");
require("dotenv").config();

async function updateEventRegistrationSheet(dataArray) {
  try {
    const accessToken = await getAccessToken();

    // Set up OAuth2 client with the access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const sheets = google.sheets({
      version: "v4",
      auth: oauth2Client, // Use OAuth2 client here
    });

    const spreadsheetId = process.env.EVENT_REGISTRATION_SHEET_ID;
    const range = "Sheet1!A2:Z"; // Adjust the range as needed

    const values = dataArray.map((data) => [
      data.registrationId,
      data.eventId,
      data.eventName,
      data.eventParticipants,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.universityName,
      data.isNiitStudent ? "Yes" : "No",
      data.teamMembers,
      data.registrationTime.toLocaleString(),
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

module.exports = updateEventRegistrationSheet;
