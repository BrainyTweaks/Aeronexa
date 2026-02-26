// use global encodeURIComponent

export async function findTransport(origin: string, destination: string, date?: string) {
  // Build trusted provider search links (no scraping)
  const depart = date || ''
  const formats = (d: string) => d // for now we pass date raw, global encodeURIComponent will be used

  const providers = [] as any[]

  // Kayak
  providers.push({
    provider: 'Kayak',
    type: 'flight',
    link: `https://www.kayak.com/flights/${encodeURIComponent(origin)}-${encodeURIComponent(destination)}/${formats(depart)}`,
    trusted: true
  })

  // Skyscanner
  providers.push({
    provider: 'Skyscanner',
    type: 'flight',
    link: `https://www.skyscanner.com/transport/flights/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/${formats(depart)}`,
    trusted: true
  })

  // Google Flights (search fallback)
  providers.push({
    provider: 'Google Flights',
    type: 'flight',
    link: `https://www.google.com/travel/flights?q=${encodeURIComponent(origin + ' to ' + destination + (depart ? ' on ' + depart : ''))}`,
    trusted: true
  })

  // Trainline (EU) / Amtrak (US) links as train provider examples
  providers.push({
    provider: 'Trainline',
    type: 'train',
    link: `https://www.thetrainline.com/search?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&outwardDate=${encodeURIComponent(depart)}`,
    trusted: true
  })

  providers.push({
    provider: 'Amtrak',
    type: 'train',
    link: `https://www.amtrak.com/tickets-explore?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}`,
    trusted: true
  })

  return providers
}
