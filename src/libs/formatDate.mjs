import format from 'date-fns/format'
import frLocale from 'date-fns/locale/fr'

function formatDate (year, month, day, hour) {
  let formattedDate = format(
    new Date(year, month, day),
    'dddd D MMMM',
    { locale: frLocale }
  )

  formattedDate = formattedDate.toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
  
  return `${formattedDate} ${hour}`
}

export default formatDate