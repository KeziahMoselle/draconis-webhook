import fs from 'fs'
import {Signale} from 'signale'

const logStream = fs.createWriteStream('output.log', {
  autoClose: true,
  encoding: 'utf8'
})

const options = {
  interactive: true,
  stream: logStream
}

const logger = new Signale(options)

export default Signale