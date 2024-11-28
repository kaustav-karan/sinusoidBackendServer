const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

// const OAuth2Client = new OAuth2(process.env.clientId, process.env.clientSecret);

// OAuth2Client.setCredentials({ refresh_token: process.env.refreshToken });

function sendMail(name, subject, recipient, htmlMsg, textMsg) {
  // const accessToken = OAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // type: "OAuth2",
      user: process.env.EMAIL,
      // pass: process.env.GMAIL_PASSWORD,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: accessToken,
    },
  });
  

  const mailOptions = htmlMsg
    ? {
        from: `No Reply siNUsoid ${process.env.EMAIL}`,
        to: recipient,
        subject: subject,
        html: htmlMsg,
      }
    : {
        from: `No Reply siNUsoid ${process.env.EMAIL}`,
        to: recipient,
        subject: subject``,
        text: textMsg,
      };

  transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(response);
    }
    transport.close();
  });
}

module.exports = {sendMail};
