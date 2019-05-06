import getEvents from './getEvents.mjs'


async function getGuildEvents () {
  let guildEvents = []
  const events = await getEvents()

  events.forEach(event => {
    /* 
     * /wow/assets/lfg/ is only used on custom events
     */
    if (event.img.includes('/wow/assets/lfg/')) {
      guildEvents.push(event)
    }
  })

  return guildEvents
}

export default getGuildEvents