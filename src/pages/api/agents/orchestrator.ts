import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// Minimal orchestrator skeleton — routes requests to agents
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { input, agent } = req.body || {}

  if (!input) return res.status(400).json({ error: 'missing input' })

  try {
    // Simple routing example — expand to real agent calls
    if (agent === 'weather') {
      // Use Open-Meteo (no API key required)
      const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: { latitude: 40.7128, longitude: -74.0060, hourly: 'temperature_2m' }
      })
      return res.status(200).json({ agent: 'weather', data: data })
    }

    // Default — echo
    return res.status(200).json({ agent: 'echo', input })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'orchestrator error' })
  }
}
