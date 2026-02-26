import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// Simple endpoint to check agent health and API connectivity
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const checks: any = {
    timestamp: new Date().toISOString(),
    status: 'ok',
    agents: {}
  }

  // Check Nominatim geocoding (used by master agent)
  try {
    await axios.get('https://nominatim.openstreetmap.org/search?q=paris&format=json&limit=1', {
      headers: { 'User-Agent': 'Aeronexa/1.0' },
      timeout: 5000
    })
    checks.agents.geocoding = 'ok'
  } catch (e) {
    checks.agents.geocoding = 'error'
    checks.status = 'degraded'
  }

  // Check Open-Meteo weather API
  try {
    await axios.get('https://api.open-meteo.com/v1/forecast?latitude=48.8&longitude=2.3&daily=temperature_2m_max', {
      timeout: 5000
    })
    checks.agents.weather = 'ok'
  } catch (e) {
    checks.agents.weather = 'error'
    checks.status = 'degraded'
  }

  // Check HuggingFace (if key is set)
  if (process.env.HUGGINGFACE_API_KEY) {
    try {
      await axios.post(
        'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
        { inputs: 'test' },
        {
          headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
          timeout: 5000
        }
      )
      checks.agents.embeddings = 'ok'
    } catch (e) {
      checks.agents.embeddings = 'error'
      checks.status = 'degraded'
    }
  } else {
    checks.agents.embeddings = 'skipped'
  }

  const statusCode = checks.status === 'ok' ? 200 : checks.status === 'degraded' ? 206 : 503
  return res.status(statusCode).json(checks)
}
