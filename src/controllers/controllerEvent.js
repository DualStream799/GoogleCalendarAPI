'use strict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/repositoryEvent');
const calendarService = require('../services/serviceGoogleCalendar');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.post = async(req, res, next) => {

    try {
        // Create start time:
        const eventStartTime = new Date();
        eventStartTime.setDate(eventStartTime.getDay() + req.body.days_from_now);
        // Create end time:
        const eventEndTime = new Date();
        eventEndTime.setDate(eventEndTime.getDay() + req.body.days_from_now);
        eventEndTime.setMinutes(eventEndTime.getMinutes() + req.body.eventDuration);

        const event = {
            summary: req.body.summary,
            description: req.body.description,
            start: { 
                dateTime: eventStartTime,
                timeZone: 'America/Sao_Paulo'
            },
            end: {
                dateTime: eventEndTime,
                timeZone: 'America/Sao_Paulo'
            },
            colorId: 1
        }
        
        calendarService.createEvent(event, eventStartTime, eventEndTime);

        res.status(201).send({ message: "Event created successfully" });
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}