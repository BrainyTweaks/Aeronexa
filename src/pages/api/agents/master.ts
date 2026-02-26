import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { findTransport } from '../../../lib/agents/transport'
import { findHotels } from '../../../lib/agents/hotels'
import { findAttractions } from '../../../lib/agents/attractions'
import { getWeather } from '../../../lib/agents/weatherAgent'
import { getNewsForPlace } from '../../../lib/agents/newsAgent'

// Helper: geocode via Nominatim
async function geocode(q: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`
  const r = await axios.get(url, { headers: { 'User-Agent': 'Aeronexa/1.0 (contact@example.com)' } })
  if (!r.data || r.data.length === 0) return null
  const { lat, lon, display_name } = r.data[0]
  return { lat: Number(lat), lon: Number(lon), display_name }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { origin, destination, departDate } = req.body || {}
  if (!origin || !destination) return res.status(400).json({ error: 'missing origin or destination' })

  try {
    const [geoOrigin, geoDest] = await Promise.all([geocode(origin), geocode(destination)])
    if (!geoOrigin || !geoDest) return res.status(400).json({ error: 'could not geocode locations' })

    // Run specialist agents in parallel
    const [transport, hotels, attractions, weather, news] = await Promise.all([
      findTransport(origin, destination, departDate),
      findHotels(destination, departDate),
      findAttractions(geoDest.lat, geoDest.lon, 8),
      getWeather(geoDest.lat, geoDest.lon),
      getNewsForPlace(destination, 8)
    ])

    // Basic overseer checks: ensure providers are trusted and non-empty results
    const oversee = {
      transport_ok: Array.isArray(transport) && transport.length > 0,
      hotels_ok: hotels && hotels.sample && hotels.sample.length > 0,
      attractions_ok: Array.isArray(attractions) && attractions.length > 0,
      weather_ok: weather && weather.daily && weather.daily.length > 0,
      news_ok: news && news.results && news.results.length > 0
    }

    return res.status(200).json({ origin: geoOrigin, destination: geoDest, transport, hotels, attractions, weather, news, oversee })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || String(err) })
  }
}
