import diff from '../src/libs/diff'

const oldEvents = [
  {
    title: 'First event',
    date: 'Samedi 29 Juin 19:00',
    img: 'http://media.blizzard.com/wow/assets/calendar/ui-calendar-event-other.png'
  }
]

const newEvents = [
  {
    title: 'First event',
    date: 'Samedi 29 Juin 19:00',
    img: 'http://media.blizzard.com/wow/assets/calendar/ui-calendar-event-other.png'
  },
  {
    title: 'Second event',
    date: 'Mercredi 3 Juillet 20:30',
    img: 'http://media.blizzard.com/wow/assets/calendar/ui-calendar-event-other.png'
  },
  {
    title: 'Third event',
    date: 'Samedi 29 Juin 19:00',
    img: 'http://media.blizzard.com/wow/assets/calendar/ui-calendar-event-other.png'
  }
]

test('detects new events', () => {
  expect(diff(oldEvents, newEvents)).toEqual([
    {
      "date": "Mercredi 3 Juillet 20:30",
      "img": "http://media.blizzard.com/wow/assets/calendar/ui-calendar-event-other.png",
      "title": "Second event"
    },
    {
      "date": "Samedi 29 Juin 19:00",
      "img": "http://media.blizzard.com/wow/assets/calendar/ui-calendar-event-other.png",
      "title": "Third event"
    }
  ])
})

test('do not detect new events', () => {
  expect(diff(oldEvents, oldEvents)).toEqual(undefined)
})