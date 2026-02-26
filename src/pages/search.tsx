import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Search() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function run() {
    if (!query) return
    setLoading(true)
    const res = await fetch('/api/agents/retrieval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    const j = await res.json()
    setResult(j)
    setLoading(false)
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ padding: 24 }}>
        <h1>Search / Retrieval</h1>
        <div className="card">
          <input style={{ width: '70%' }} value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="button" onClick={run} disabled={loading} style={{ marginLeft: 8 }}>
            Run
          </button>
        </div>
        <div style={{ marginTop: 16 }}>
        {loading && <div>Loading...</div>}
        {result && (
          <div>
            <h3>Answer</h3>
            <div style={{ whiteSpace: 'pre-wrap' }}>{result.answer}</div>

            <h4>Retrieved Docs</h4>
            {result.docs?.map((d: any, i: number) => (
              <div key={i} style={{ borderTop: '1px solid #eee', padding: 8 }}>
                <div><strong>Score:</strong> {d.score?.toFixed(4)}</div>
                <div>{d.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
  )
}
