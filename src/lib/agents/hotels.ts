import axios from 'axios'

export async function findHotels(destination: string, checkin?: string, checkout?: string) {
  // Try to construct trusted search links for hotels in the destination
  const city = encodeURIComponent(destination)
  const booking = `https://www.booking.com/searchresults.html?ss=${city}`
  const expedia = `https://www.expedia.com/Hotel-Search?destination=${city}`
  const hotelscom = `https://www.hotels.com/search.do?q-destination=${city}`

  // As we don't have a hotels API key, return provider links and placeholder entries
  const sample = [
    { name: 'Top Rated Hotel A', rating: 4.6, price: 180, reviews: 1243, link: booking, trusted: true },
    { name: 'Comfort Stay B', rating: 4.2, price: 120, reviews: 842, link: expedia, trusted: true },
    { name: 'Budget Inn C', rating: 3.9, price: 70, reviews: 412, link: hotelscom, trusted: true }
  ]

  return { searchLinks: { booking, expedia, hotelscom }, sample }
}
