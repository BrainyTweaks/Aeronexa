import type { NextApiRequest, NextApiResponse } from 'next'
import { generateText } from '../../../lib/hf'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { message } = req.body || {}
  if (!message) return res.status(400).json({ error: 'missing message' })

  try {
    const resp = await generateText(message)
    return res.status(200).json({ reply: resp })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'generation error' })
  }
}
