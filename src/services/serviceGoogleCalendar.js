'use strict';

const { google } = require('googleapis');
const config = require('../config');

// Get values from config:
const client_id = process.env.CALENDAR_CLIENT_ID;
const client_secret = process.env.CALENDAR_CLIENT_SECRET;
const refresh_token = process.env.CALENDAR_REFRESH_TOKEN;

// Authenticate credentials:
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(client_id, client_secret);
OAuth2Client.setCredentials({ refresh_token:refresh_token });
const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });

exports.createEvent = async(event, eventStartTime, eventEndTime) => {
  // Verifies if there's already an event on the selected time window:
  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Sao_Paulo',
        items: [{ id: 'primary' }],
      },
    },
    (err, res) => {
      // Check for errors in our query and log them if they exist.
      if (err) {
        return console.error('Free Busy Query Error: ', err);
      }

      // Create an array of all events on our calendar during that time.
      const eventArr = res.data.calendars.primary.busy;

      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0) {

        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: 'primary', resource: event },
          err => {
            // Check for errors and log them if they exist.
            if (err) return console.error('Error Creating Calender Event:', err);
            // Else log that the event was created.
            return console.log('Calendar event successfully created.');
          }
        )

      // If event array is not empty log that we are busy.
      return console.log(`Sorry I'm busy...`)        
      }
    }
  );
}
