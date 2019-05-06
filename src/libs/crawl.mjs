import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import axios from 'axios'
import Diff from 'diff'
import getGuildEvents from './getGuildEvents.mjs'
import generateEmbed from './generateEmbed.mjs'

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
      guildEvents.forEach(event => {
        const embed = generateEmbed(event.title, event.date)
        axios.post(process.env.DISCORD_WEBHOOK_URL, embed)
      })
    } else {
      // Send only new events here
      
      // Check for differences between new events and file
      // To detect new events
      try {
        const oldEvents = fs.readFileSync('events.json', 'utf8')
        const newEvents = JSON.stringify(guildEvents)
        console.log(oldEvents)
        console.log(newEvents)
        // If there is a difference -> Post the last/new event
        const result = Diff.diffJson(oldEvents, newEvents)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  })
}

export default crawl