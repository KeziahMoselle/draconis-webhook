import axios from 'axios'
import generateEmbed from './generateEmbed.mjs'
import logger from './log.mjs'

async function sendToWebhook (event) {
  try {
    const embed = generateEmbed(event.title, event.date, event.img)
    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, embed)
    
    if (response.status >= 200 && response.status <= 299) {
      logger.success(`[${event.title} - ${event.date}] - Has been sent to the WebHook.`)
    } else {
      logger.success(`Error while sending [${event.title} - ${event.date}] - ${response.status}`)
    }
  } catch (error) {
    logger.error(error)
  }
}

export default sendToWebhook