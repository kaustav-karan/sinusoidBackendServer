const admin = require("firebase-admin");
const serviceAccount = require("../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sinusoidcms-2024.appspot.com", // e.g., project-id.appspot.com
});

const bucket = admin.storage().bucket();

module.exports = bucket;
