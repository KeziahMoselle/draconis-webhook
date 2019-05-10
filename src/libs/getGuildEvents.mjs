import getEvents from './getEvents.mjs'

async function getGuildEvents () {
  let guildEvents = []
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

  return guildEvents
}

export default getGuildEvents