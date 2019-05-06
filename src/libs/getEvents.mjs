import dotenv from 'dotenv'
dotenv.config()
import puppeteer from 'puppeteer'

async function getEvents () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://eu.battle.net/wow/fr/vault/character/event')
  await page.type('#accountName', process.env.BLIZZARD_EMAIL)
  await page.type('#password', process.env.BLIZZARD_PASSWORD)
  await page.click('#submit')
  console.log('Logging in...')
  await page.waitForNavigation()
  console.log('Logged in.')
  
  console.log('Scrapping...')
  const data = await page.evaluate(() => {
    let events = []
  
    let eventsElements = document.querySelectorAll('.event-summary')

    eventsElements.forEach(eventElement => {
      let eventData = {}
      eventData.title = eventElement.querySelector('.name').innerText
      eventData.date = eventElement.querySelector('.datetime').innerText
      eventData.img = eventElement.querySelector('img').src
      events.push(eventData)
    })

    return events
  })
  console.log('Scrapping finished.')

  await browser.close()

  return data
}

export default getEvents