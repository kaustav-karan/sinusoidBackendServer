const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const clientId = process.env.EVENT_REGISTRATION_SHEET_CLIENT_ID;
const clientSecret = process.env.EVENT_REGISTRATION_SHEET_CLIENT_SECRET;
const refreshToken = process.env.EVENT_REGISTRATION_SHEET_REFRESH_TOKEN;

// Validate and handle missing environment variables gracefully
if (!clientId || !clientSecret || !refreshToken) {
  throw new Error(
    "Missing required environment variables: EVENT_REGISTRATION_SHEET_*"
  );
}

async function getAccessToken() {
  const oauth2Client = new OAuth2Client(clientId, clientSecret);

  // Set the refresh token directly in the OAuth2 client
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  try {
    // Use getAccessToken() to retrieve a new access token using the refresh token
    const tokenResponse = await oauth2Client.getAccessToken();
    if (!tokenResponse.token) {
      throw new Error("Failed to retrieve access token.");
    }

    return tokenResponse.token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

module.exports = getAccessToken;
