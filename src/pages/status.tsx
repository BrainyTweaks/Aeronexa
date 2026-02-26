import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function checkHealth() {
    setLoading(true)
    const res = await fetch('/api/health')
    const j = await res.json()
    setStatus(j)
    setLoading(false)
  }

  return (
    <div className="container">
      <Navbar />
      <div style={{ padding: 24 }}>
        <h1>System Status</h1>
        <div className="card">
          <p>Check the health of Aeronexa agents and API connectivity.</p>
          <button className="button" onClick={checkHealth} disabled={loading}>
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        {status && (
          <div className="card">
            <h3>Status Report</h3>
            <div><strong>Timestamp:</strong> {status.timestamp}</div>
            <div><strong>Overall:</strong> <span style={{color: status.status === 'ok' ? 'green' : 'orange'}}>{status.status.toUpperCase()}</span></div>
            
            <h4 style={{ marginTop: 16 }}>Agent Status</h4>
            {Object.entries(status.agents).map(([agent, st]: any) => (
              <div key={agent} style={{padding: 8, borderLeft: `4px solid ${st === 'ok' ? 'green' : st === 'skipped' ? 'gray' : 'orange'}`}}>
                <strong>{agent}:</strong> <span style={{color: st === 'ok' ? 'green' : st === 'skipped' ? 'gray' : 'orange'}}>{st}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
