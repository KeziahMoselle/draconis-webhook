import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import getGuildEvents from './getGuildEvents.mjs'
import sendToWebhook from './sendToWebhook.mjs';

async function crawl () {
  const guildEvents = await getGuildEvents()

  fs.access('events.json', fs.constants.F_OK, (error) => {
    if (error) {
      // First time running the bot

      // Save file for next check
      fs.writeFile('events.json', JSON.stringify(guildEvents), error => {
        if (error) console.log(error)
      })

      // Send all current events to the WebHook
      guildEvents.forEach(event => sendToWebhook(event))
    } else {
      // Send only new events here
      
      // Check for differences between new events and file
      // To detect new events
      try {
        const oldEvents = JSON.parse(fs.readFileSync('events.json', 'utf8'))
        const lastOldEvent = oldEvents[oldEvents.length - 1]
        const lastCurrentEvent = guildEvents[guildEvents.length - 1]

        console.log(`Old Event - [${lastOldEvent.date}]`)
        console.log(`Current Event - [${lastCurrentEvent.date}]`)
        if (lastOldEvent.date !== lastCurrentEvent.date) {
          console.log('New event detected.')
          sendToWebhook(lastCurrentEvent)
        } else {
          console.log('No new event detected.')
        }
      } catch (error) {
        console.log(error)
      }

      // Save file for next check
      fs.writeFile('events.json', JSON.stringify(guildEvents), error => {
        if (error) return console.log(error)
        console.log('Saved events.json')
      })
    }
  })
}

export default crawl