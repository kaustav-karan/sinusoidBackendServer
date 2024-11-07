const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    attendeeId: { type: String, required: true },
    venueId: { type: String, required: true },
    name: { type: String, required: true },
    entryTime: { type: Date, required: true },
})

const logModal = mongoose.model('log', logSchema);
module.exports = logModal;