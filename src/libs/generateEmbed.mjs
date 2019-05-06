import dotenv from 'dotenv'
dotenv.config()

function generateEmbed (title, date, img = process.env.GUILD_THUMBNAIL_URL) {
  return {
    "content": `Nouvel événement pour <${process.env.GUILD_NAME}>`,
    "embeds": [
      {
        "color": 16736617,
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