'use strict';

const mongoose = require('mongoose');
const Event = mongoose.model('Event');

exports.get = async() => {
    // Insert get all events here
}

exports.create = async(data) => {
    var event = new Event(data);
    await event.save();
}