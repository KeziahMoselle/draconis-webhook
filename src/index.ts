import crawl from './libs/crawl'
import checkEnv from './libs/checkEnv'

// const interval: number = parseInt(process.env.INTERVAL, 10)

// Check the necessary environment variables
checkEnv()

// Start crawling
crawl()
// INTERVAL in minutes (i.e 60 = every hour)
// setInterval(crawl, 1000 * 60 * interval)