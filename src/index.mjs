import crawl from './libs/crawl.mjs'
import checkEnv from './libs/checkEnv.mjs'

// Check the necessary environment variables
checkEnv()

// Start crawling
crawl()
// INTERVAL in minutes (i.e 60 = every hour)
setInterval(crawl, 1000 * 60 * process.env.INTERVAL)