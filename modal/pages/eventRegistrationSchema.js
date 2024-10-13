const { language } = require("googleapis/build/src/apis/language");
const mongoose = require("mongoose");

// const soloEventRegistrationSchema = mongoose.Schema({
//     eventId: { type: String, required: true },
//     eventParticipants: { type: String, required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     universityName: { type: String, required: true },
//     isNiitStudent: { type: Boolean, required: true }
// });

// const teamEventRegistrationSchema = mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     universityName: { type: String, required: true },
//     isNiitStudent: { type: Boolean, required: true },
//     teamDetails: [{
//         teamMemberName: { type: String, required: true },
//         teamMemberEmail: { type: String, required: true }
//     }],
//     eventId: { type: String, required: true },
//     eventParticipants: { type: String, required: true }
// });

const eventRegistrationSchema = mongoose.Schema({
    registrationId: { type: String, required: true },
    eventId: { type: String, required: true },
    eventParticipants: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    universityName: { type: String, required: true },
    isNiitStudent: { type: Boolean, required: true },
    teamMembers: { type: Number, required: true },
    teamDetails: [{
        teamMemberName: { 
            type: String, 
            required: function() { return this.teamDetails.length > 0; } 
        },
        teamMemberEmail: { 
            type: String, 
            required: function() { return this.teamDetails.length > 0; } 
        }
    }]
});

const eventRegistrationModal = mongoose.model("eventRegistrations", eventRegistrationSchema);
module.exports = eventRegistrationModal;