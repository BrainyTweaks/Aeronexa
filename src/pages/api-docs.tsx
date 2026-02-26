import Navbar from '../components/Navbar'

export default function APIDocs() {
  const endpoints = [
    {
      name: 'Master Orchestrator',
      method: 'POST',
      path: '/api/agents/master',
      desc: 'Run full travel planning workflow across all agents',
      body: '{ origin, destination, departDate }'
    },
    {
      name: 'Conversational Agent',
      method: 'POST',
      path: '/api/agents/conversational',
      desc: 'Chat with the AI about travel-related topics',
      body: '{ message }'
    },
    {
      name: 'Ingest Documents',
      method: 'POST',
      path: '/api/agents/ingest',
      desc: 'Store text/documents for later retrieval',
      body: '{ text }'
    },
    {
      name: 'Retrieve Documents',
      method: 'POST',
      path: '/api/agents/retrieval',
      desc: 'Search ingested documents via vector similarity',
      body: '{ query }'
    },
    {
      name: 'Clear Vectors',
      method: 'POST',
      path: '/api/agents/clearVectors',
      desc: 'Delete all stored vectors (development only)',
      body: '{}'
    },
    {
      name: 'Search History',
      method: 'GET|POST|DELETE',
      path: '/api/history',
      desc: 'Get, store, or delete user search history (requires auth)',
      body: '(auth required, see page)'
    },
    {
      name: 'Health Check',
      method: 'GET',
      path: '/api/health',
      desc: 'Check system health and API connectivity',
      body: 'N/A'
    }
  ]

  return (
    <div className="container">
      <Navbar />
      <div style={{ padding: 24 }}>
        <h1>API Documentation</h1>
        <div className="card">
          <p>Complete list of available Aeronexa endpoints and their usage.</p>
        </div>

        {endpoints.map((ep, i) => (
          <div key={i} className="card" style={{ marginTop: 12 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{ep.name}</h3>
            <div><code style={{backgroundColor:'#f0f0f0',padding:'2px 4px'}}>{ep.method} {ep.path}</code></div>
            <div style={{marginTop: 8}}><strong>Description:</strong> {ep.desc}</div>
            <div style={{marginTop: 4}}><strong>Request Body:</strong> <code style={{backgroundColor:'#f0f0f0',padding:'2px 4px'}}>{ep.body}</code></div>
          </div>
        ))}

        <div className="card" style={{marginTop:12}}>
          <h3>Authentication</h3>
          <p>Endpoints requiring authentication use Firebase ID tokens.</p>
          <p>Include header: <code style={{backgroundColor:'#f0f0f0',padding:'2px 4px'}}>Authorization: Bearer &lt;idToken&gt;</code></p>
          <p>Get token: <code style={{backgroundColor:'#f0f0f0',padding:'2px 4px'}}>await auth.currentUser.getIdToken()</code></p>
        </div>
      </div>
    </div>
  )
}
