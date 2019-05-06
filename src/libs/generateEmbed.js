function generateEmbed (title, date, img) {
 return {
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
}

export default generateEmbed