import puppeteer from 'puppeteer'

async function getEvents () {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'development' ? false : true
  })
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
    const events = []
  
    const eventsElements: any = document.querySelectorAll('.event-summary')

    eventsElements.forEach(eventElement => {
      events.push({
        title: eventElement.querySelector('.name').innerText,
        date: eventElement.querySelector('.datetime').innerText,
        img: eventElement.querySelector('img').src
      })
    })

    return events
  })
  console.log('Scrapping finished.')

  await browser.close()

  return data
}

export default getEvents