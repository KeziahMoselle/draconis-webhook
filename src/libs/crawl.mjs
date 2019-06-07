import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import Diff from 'diff'
import getGuildEvents from './getGuildEvents.mjs'
import sendToWebhook from './sendToWebhook.mjs'
import logger from './log.mjs'

async function crawl () {
  const guildEvents = await getGuildEvents()

  fs.access('events.json', fs.constants.F_OK, (error) => {
    if (error) {
      // First time running the bot

      // Save file for next check
      fs.writeFile('events.json', JSON.stringify(guildEvents), error => {
        if (error) logger.error(error)
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

        const results = Diff.diffJson(oldEvents, guildEvents)
        results.forEach(result => {
          if (result.added) {
            const newEvents = JSON.parse(`[${result.value.replace(/(\\n|\s|')/, '')}]`)
            newEvents.forEach(event => sendToWebhook(event))
          }
        })
      } catch (error) {
        logger.error(error)
      }

      // Save file for next check
      fs.writeFile('events.json', JSON.stringify(guildEvents), error => {
        if (error) return logger.error(error)
        logger.success('Saved events.json')
      })
    }
  })
}

export default crawl