import axios from 'axios'
import generateEmbed from './generateEmbed'

async function sendToWebhook (event) {
  try {
    if (process.env.DEV) {
      return console.log(`DEV - [${event.title} - ${event.date}] - Has been sent to the WebHook.`)
    }

    const embed = generateEmbed(event.title, event.date, event.img)
    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, embed)
    
    if (response.status >= 200 && response.status <= 299) {
      console.log(`[${event.title} - ${event.date}] - Has been sent to the WebHook.`)
    } else {
      console.log(`Error while sending [${event.title} - ${event.date}] - ${response.status}`)
      // Retry if error
      setTimeout(() => {
        sendToWebhook(event)
      }, 10000);
    }
  } catch (error) {
    console.log(error)
  }
}

export default sendToWebhook