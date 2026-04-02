export function formatContentDate(date: string, locale = 'en-US', options?: Intl.DateTimeFormatOptions) {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (match) {
    const [, year, month, day] = match
    return new Intl.DateTimeFormat(locale, options).format(
      new Date(Number(year), Number(month) - 1, Number(day))
    )
  }

  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}
