import fs from 'fs'
import diff from './diff'
import getGuildEvents from './getGuildEvents'
import sendToWebhook from './sendToWebhook';

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
      let timeout = 0
      for (const i in guildEvents) {
        setTimeout(() => sendToWebhook(guildEvents[i]), timeout)
        timeout += 2500
      }
    } else {
      // Send only new events here
      
      // Check for differences between new events and file
      // To detect new events
      try {
        const oldEvents = JSON.parse(fs.readFileSync('events.json', 'utf8'))

        const newEvents = diff(oldEvents, guildEvents)
        if (newEvents) {
          newEvents.forEach(event => sendToWebhook(event));
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