import axios from 'axios'
import generateEmbed from './generateEmbed.mjs'

async function sendToWebhook (event) {
  const embed = generateEmbed(event.title, event.date)
  const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, embed)
  
  if (response.status >= 200 && response.status <= 299) {
    console.log(`[${event.title} - ${event.date}] - Has been sent to the WebHook.`)
  } else {
    console.log(`Error while sending [${event.title} - ${event.date}] - ${response.status}`)
  }
}

export default sendToWebhook