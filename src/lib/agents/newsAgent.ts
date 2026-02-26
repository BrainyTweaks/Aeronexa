import axios from 'axios'
import { parseStringPromise } from 'xml2js'

const DANGEROUS_KEYWORDS = ['riot','attack','shooting','earthquake','bomb','protest','violence','terror']

export async function getNewsForPlace(place: string, maxItems = 10) {
  const q = encodeURIComponent(place)
  const url = `https://news.google.com/rss/search?q=${q}`
  const r = await axios.get(url)
  const xml = r.data
  const parsed = await parseStringPromise(xml)
  const items = parsed.rss?.channel?.[0]?.item || []
  const results = items.slice(0, maxItems).map((it: any) => ({ title: it.title?.[0], link: it.link?.[0], pubDate: it.pubDate?.[0] }))

  // Safety heuristic
  const combinedText = results.map((r:any)=>r.title||'').join(' ').toLowerCase()
  const unsafe = DANGEROUS_KEYWORDS.some(k => combinedText.includes(k))

  return { results, safety: unsafe ? 'not_safe' : 'generally_safe' }
}
