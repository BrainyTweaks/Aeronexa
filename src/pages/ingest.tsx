import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Ingest() {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  async function submit() {
    setStatus('processing')
    const res = await fetch('/api/agents/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url || undefined, text: text || undefined })
    })
    const j = await res.json()
    setStatus(j.added ? `added ${j.added} chunks` : j.error || 'done')
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: 24 }}>
      <h1>Ingest content</h1>
      <div>
        <label>URL</label>
        <input style={{ width: '80%' }} value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div style={{ marginTop: 12 }}>
        <label>Or paste text</label>
        <textarea style={{ width: '80%', height: 200 }} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={submit}>Ingest</button>
        <span style={{ marginLeft: 12 }}>{status}</span>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={async()=>{await fetch('/api/agents/clearVectors');setStatus('cleared')}}>Clear stored vectors</button>
      </div>
    </div>
  </div>
  )
}
