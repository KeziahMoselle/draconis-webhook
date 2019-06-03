import getEvents from './getEvents.mjs'
import formatDate from './formatDate.mjs'

async function getGuildEvents () {
  const guildEvents = []
  const events = await getEvents()

  events.forEach(event => {
    if (
      event.img.includes('/wow/assets/lfg/') ||
      event.img.includes('/wow/assets/calendar/ui-calendar-event-other.png') ||
      event.img.includes('/wow/assets/calendar/ui-calendar-event-pvp01.png') ||
      event.img.includes('/wow/assets/calendar/calendar_meetingstart.png')
    ) {
      guildEvents.push(event)
    }
  })

  const formattedGuildEvents = guildEvents.map(event => {
    const regex = /^(.*)\/(.*)\/(.*) (.*)$/gm
    const [, day, month, year, hour] = regex.exec(event.date)

    return {
      title: event.title,
      date: formatDate(year, month, day, hour),
      img: event.img
    }
  })

  return formattedGuildEvents
}

export default getGuildEvents