import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { embedText } from '../../../lib/hf'
import { addDocuments, clearStore } from '../../../lib/vectorStore'

function splitText(text: string, chunkSize = 500) {
  const out: string[] = []
  for (let i = 0; i < text.length; i += chunkSize) out.push(text.slice(i, i + chunkSize))
  return out
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { url, text } = req.body || {}
  if (!url && !text) return res.status(400).json({ error: 'missing url or text' })

  try {
    let content = text || ''
    if (url) {
      const r = await axios.get(url)
      const $ = cheerio.load(r.data)
      content = $('body').text().replace(/\s+/g, ' ').trim()
    }

    const chunks = splitText(content, 800)
    const docs = [] as any[]
    for (const c of chunks) {
      const emb = await embedText(c)
      docs.push({ text: c, embedding: emb })
    }

    await addDocuments(docs)
    return res.status(200).json({ added: docs.length })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'ingest error' })
  }
}
