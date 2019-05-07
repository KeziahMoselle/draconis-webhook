import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import Diff from 'diff'
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

        const results = Diff.diffJson(oldEvents, guildEvents)
        results.forEach(result => {
          if (result.added) {
            const newEvents = JSON.parse(`[${result.value.replace(/(\\n|\s|')/, '')}]`)
            newEvents.forEach(event => sendToWebhook(event))
          }
        })
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