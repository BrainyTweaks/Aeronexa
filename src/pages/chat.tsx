import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<{ q: string; a: string }[]>([])
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!message) return
    setLoading(true)
    const res = await fetch('/api/agents/conversational', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
    const j = await res.json()
    setHistory((h) => [{ q: message, a: j.reply || j.error }, ...h])
    setMessage('')
    setLoading(false)
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ padding: 24 }}>
        <h1>Chat with Aeronexa</h1>
        <div className="card" style={{ marginBottom: 12 }}>
          <label htmlFor="chatMessage" style={{ display: 'none' }}>Message</label>
          <input id="chatMessage" style={{ width: '70%' }} placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="button" onClick={send} disabled={loading} style={{ marginLeft: 8 }}>
            Send
          </button>
        </div>
        <div>
          {history.map((h, i) => (
            <div key={i} style={{ borderTop: '1px solid #eee', padding: 8 }}>
              <div><strong>You:</strong> {h.q}</div>
              <div><strong>Bot:</strong> {h.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
