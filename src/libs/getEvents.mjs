import dotenv from 'dotenv'
dotenv.config()
import puppeteer from 'puppeteer'
import logger from './log.mjs'

async function getEvents () {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'development' ? false : true
  })
  const page = await browser.newPage()
  await page.goto('https://eu.battle.net/wow/fr/vault/character/event')
  await page.type('#accountName', process.env.BLIZZARD_EMAIL)
  await page.type('#password', process.env.BLIZZARD_PASSWORD)
  await page.click('#submit')
  logger.await('[%d/4] - Logging in...', 1)
  await page.waitForNavigation()
  logger.success('[%d/4] - Logged in...', 2)
  logger.await('[%d/4] - Scrapping...', 3)
  const data = await page.evaluate(() => {
    const events = []
  
    const eventsElements = document.querySelectorAll('.event-summary')

    eventsElements.forEach(eventElement => {
      events.push({
        title: eventElement.querySelector('.name').innerText,
        date: eventElement.querySelector('.datetime').innerText,
        img: eventElement.querySelector('img').src
      })
    })

    return events
  })
  logger.success('[%d/4] - Scrapping finished.', 4)

  await browser.close()

  return data
}

export default getEvents