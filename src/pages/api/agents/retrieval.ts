import type { NextApiRequest, NextApiResponse } from 'next'
import { embedText, generateText } from '../../../lib/hf'
import { queryVector } from '../../../lib/vectorStore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { query, topK } = req.body || {}
  if (!query) return res.status(400).json({ error: 'missing query' })

  try {
    const qemb = await embedText(query)
    const results = await queryVector(qemb, topK || 5)

    // Build a context and ask model to answer using retrieved docs
    const context = results.map((r: any, i: number) => `Doc ${i + 1}: ${r.text}`).join('\n\n')
    const prompt = `Use the following documents to answer the question:\n\n${context}\n\nQuestion: ${query}\nAnswer:`
    const answer = await generateText(prompt)

    return res.status(200).json({ answer, docs: results })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'retrieval error' })
  }
}
