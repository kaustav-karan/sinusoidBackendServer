const mongoose = require("mongoose");
const uuid = require("uuid4");

const hackathonSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    collegeName: { type: String, required: true },
    teamName: { type: String, required: true },
    noOfTeamMembers: { type: Number, required: true },
    teamMembers: [
        {
            name: { type: String, required: true },
            emailId: { type: String, required: true }
        },
    ]
});

const hackathonModal = mongoose.model("hackathonRegistrations", hackathonSchema);
module.exports = hackathonModal;