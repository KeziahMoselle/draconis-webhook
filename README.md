# draconis-webhook

This WebHook sends new guild events to a Discord channel.

![Discord preview](https://i.imgur.com/gyQB6im.png)

## How it works ?

[Since Blizzard still does not offer in its public API the ability to retrieve data from the guild calendar](https://us.battle.net/forums/en/bnet/topic/13979457879?page=1) , this project scrapes the page: [https://eu.battle.net/wow/en/vault/character/event](https://eu.battle.net/wow/en/vault/character/event) to get the guild events.

## Tech stack

- Node.js
  - [Puppeteer](https://pptr.dev/)
  - [Axios](https://github.com/axios/axios)
