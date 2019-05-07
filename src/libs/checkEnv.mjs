import dotenv from 'dotenv'
dotenv.config()

const listVar = ['DISCORD_WEBHOOK_URL',
'BLIZZARD_EMAIL',
'BLIZZARD_PASSWORD',
'INTERVAL']

function checkEnv () {
  let errorsEncountered = 0

  listVar.forEach(environmentVar => {
    if (!process.env[environmentVar]) {
      console.error(`Missing environment variable : ${environmentVar}`)
      errorsEncountered++
    }
  })

  if (errorsEncountered) throw new Error('You have to fill in these environment variables.')
}

export default checkEnv