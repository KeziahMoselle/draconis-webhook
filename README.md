# draconis-webhook

This WebHook sends new guild events to a Discord channel.

![Discord preview](https://i.imgur.com/gyQB6im.png)

## How it works ?

[Since Blizzard still does not offer in its public API the ability to retrieve data from the guild calendar](https://us.battle.net/forums/en/bnet/topic/13979457879?page=1) , this project scrapes the page: [https://eu.battle.net/wow/en/vault/character/event](https://eu.battle.net/wow/en/vault/character/event) to get the guild events.

### Steps

1. Puppeteer go to `https://eu.battle.net/wow/en/vault/character/event`
2. Log in using `BLIZZARD_EMAIL` and `BLIZZARD_PASSWORD` environment variables

![Blizzard Login page](https://i.imgur.com/vxj3Dxn.png)

3. Scrap all the `.event-summary` li element

![Event list](https://i.imgur.com/iOyU6zk.png)

4. Filter guild events with the `getGuildEvents()` function
5. Save the events under an `events.json` file, if the file does not exist it assumes it's the first crawl and it will sends ALL the current events to catch up
6. Wait for the interval
7. Crawl again, diff between the `events.json` and the new JSON and send ONLY the new events
8. Repeat

## Setup

### Environment variables

- `DISCORD_WEBHOOK_URL` Events will be POSTed at this URL
- `BLIZZARD_EMAIL` Needed to log in to the events page
- `BLIZZARD_PASSWORD` Needed to log in to the events page
- `GUILD_NAME` The Guild name, it is used for the Discord embed message
- `GUILD_THUMBNAIL_URL` It is used for the Discord embed thumbnail
- `INTERVAL` It will run the crawl every `INTERVAL` minutes
- `NODE_ENV` If set to `development` it will run Puppeteer in headful mode

### Run the project

1. Clone the repo
2. `yarn` or `npm install`
3. `npm run start` to run the bot

## Tech stack

- Node.js
  - [Puppeteer](https://pptr.dev/)
  - [Axios](https://github.com/axios/axios)
