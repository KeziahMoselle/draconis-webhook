import dotenv from 'dotenv'
dotenv.config()

function generateEmbed (title, date, img, thumbnail = process.env.GUILD_THUMBNAIL_URL) {
  let color = 16777215
  // Raid + Dungeon
  if (img.includes('/wow/assets/lfg/')) {
    color = 9442302
    img = 'https://wow.zamimg.com/images/wow/icons/large/inv_enchant_voidsphere.jpg'
  }
  // Other
  if (img.includes('/wow/assets/calendar/ui-calendar-event-other.png')) color = 16042892
  // PvP
  if (img.includes('/wow/assets/calendar/ui-calendar-event-pvp01.png')) color = 13893636
  // Meeting
  if (img.includes('/wow/assets/calendar/calendar_meetingstart.png')) color = 4886754

  return {
    "content": `Nouvel événement pour <${process.env.GUILD_NAME}>`,
    "embeds": [
      {
        "color": color,
        "thumbnail": {
          "url": img
        },
        "fields": [
          {
            "name": "Event",
            "value": title
          },
          {
            "name": "Date",
            "value": date
          }
        ]
      }	
    ]
  }
}

export default generateEmbed