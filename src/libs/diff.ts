import { diff } from 'jsondiffpatch'

function difference (oldEvents: Array<Object>, newEvents: Array<Object>) {
  const delta = diff(oldEvents, newEvents)

  if (delta) {
    const deltaArray: any = Object.entries(delta)
    const newGuildEvents = deltaArray
      .flat(Infinity)
      .reduce((acc, item) => {
        if (typeof item === 'object') {
          acc.push(item)
        }
        return acc
      }, [])

    return newGuildEvents
  }

  return
}

export default difference