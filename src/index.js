require('dotenv').config()
import Discord from 'discord.js'
import getGuildEvents from './libs/getGuildEvents'
import generateEmbed from './libs/generateEmbed'

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async (message) => {
  if (message.content === '!events') {
    const events = await getGuildEvents()
    events.forEach(event => {
      const embed = generateEmbed(event.title, event.date, process.env.GUILD_THUMBNAIL_URL)
      message.channel.send(`Nouvel événement pour <${process.env.GUILD_NAME}>`, { embed })
    })
  }
})

client.login(process.env.DISCORD_CLIENT_ID)