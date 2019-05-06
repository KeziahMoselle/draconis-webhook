// Crawl for new events every hour
// Send a POST request to the WebHook URL if a new event appear
import crawl from './libs/crawl.mjs'

crawl()

setInterval(crawl, 3600000)