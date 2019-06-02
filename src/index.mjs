import http from 'http'
import crawl from './libs/crawl.mjs'
import checkEnv from './libs/checkEnv.mjs'

// Check the necessary environment variables
checkEnv()

// Start crawling
crawl()
// INTERVAL in minutes (i.e 60 = every hour)
setInterval(crawl, 1000 * 60 * process.env.INTERVAL)

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(`Discord Webhook for ${process.env.GUILD_NAME} guild.`)
})

server.listen(80, () => console.log('HTTP server started listening.'))