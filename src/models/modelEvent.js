'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    days_from_now: {
        type: Number,
        required: true
    },
    eventDuration: {
        type: Number,
        required: true,
        default: 30
    }
});

module.exports = mongoose.model('Event', schema)