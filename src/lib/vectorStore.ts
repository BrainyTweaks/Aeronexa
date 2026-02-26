import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const STORE_PATH = path.resolve(process.cwd(), 'vectors.json')

type Item = { id: string; text: string; embedding: number[] }

function load(): Item[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function save(items: Item[]) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2))
}

function cosine(a: number[], b: number[]) {
  const dot = a.reduce((s, v, i) => s + v * (b[i] ?? 0), 0)
  const na = Math.sqrt(a.reduce((s, v) => s + v * v, 0))
  const nb = Math.sqrt(b.reduce((s, v) => s + v * v, 0))
  if (na === 0 || nb === 0) return 0
  return dot / (na * nb)
}

export async function addDocuments(docs: { text: string; embedding: number[] }[]) {
  const items = load()
  for (const d of docs) {
    items.push({ id: uuidv4(), text: d.text, embedding: d.embedding })
  }
  save(items)
}

export async function queryVector(vec: number[], topK = 5) {
  const items = load()
  const scored = items.map((it) => ({ ...it, score: cosine(vec, it.embedding) }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

export async function clearStore() {
  save([])
}
