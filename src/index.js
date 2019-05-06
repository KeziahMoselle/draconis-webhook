require('dotenv').config()
import getGuildEvents from './libs/getGuildEvents'
import generateEmbed from './libs/generateEmbed'

// Crawl for new events here
// Send a POST request to the WebHook URL if a new event appear