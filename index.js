const { google } = require('googleapis')
const { OAuth2 } = google.auth
// const credentials

// const fs = require('fs')
// // Loads Applications credentials from a external JSON file:
// fs.readFile('../googleOAuthCredentials.json', 'utf8', (err, jsonString) => {
//     if (err) {
//         console.log("Error reading file from disk:", err)
//         return
//     }
//     try {
//         const jsonString = fs.readFileSync('./customer.json')
//         credentials = JSON.parse(jsonString)
//         console.log("Customer address is:", customer.address)
//     } catch(err) {
//         console.log('Error parsing JSON string:', err)
//         return
//     }
// })

// const client_id = credentials.client_id
// const client_secret = credentials.client_secret
// const refresh_token = credentials.refresh_token


const OAuth2Client = new OAuth2(client_id, client_secret)

OAuth2Client.setCredentials({ refresh_token:refresh_token })

const calendar = google.calendar({ version: 'v3', auth: OAuth2Client })

const eventStartTime = new Date()
// Set event start time tomorrow:
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Google Caledar API test',
    description: 'Event created from a NodeJS code, wich will be the foundation to and complete API',
    start: { 
        dateTime: eventStartTime,
        timeZone: 'America/Denver'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Denver'
    },
    colorId: 1
}
// Verifies if there's already an event on the selected time window:
calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        items: [{ id: 'primary' }],
      },
    },
    (err, res) => {
      // Check for errors in our query and log them if they exist.
      if (err) return console.error('Free Busy Query Error: ', err)
  
      // Create an array of all events on our calendar during that time.
      const eventArr = res.data.calendars.primary.busy
  
      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0)
        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: 'primary', resource: event },
          err => {
            // Check for errors and log them if they exist.
            if (err) return console.error('Error Creating Calender Event:', err)
            // Else log that the event was created.
            return console.log('Calendar event successfully created.')
          }
        )
  
      // If event array is not empty log that we are busy.
      return console.log(`Sorry I'm busy...`)
    }
  )