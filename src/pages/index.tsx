import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Home() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [hotelSort, setHotelSort] = useState<'price'|'rating'|null>(null)
  const [history, setHistory] = useState<any[]>([])

  async function deleteHistoryItem(id:string) {
    if (!user) return
    const token = await auth.currentUser?.getIdToken()
    if (!token) return
    await fetch('/api/history', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    })
    setHistory((h) => h.filter((x) => x.id !== id))
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (u) {
        u.getIdToken().then((t) => {
          fetch('/api/history', { headers: { Authorization: `Bearer ${t}` } })
            .then((r) => r.json())
            .then((j) => setHistory(j.history || []))
            .catch(console.error)
        })
      } else {
        setHistory([])
      }
    })
    return unsub
  }, [])

  async function search() {
    setLoading(true)
    const res = await fetch('/api/agents/master', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination, departDate: date })
    })
    const j = await res.json()
    setResult(j)
    setLoading(false)
    if (user) {
      const token = await auth.currentUser?.getIdToken()
      if (token) {
        fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ origin, destination, departDate: date, result: j })
        }).catch(console.error)
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Aeronexa</title>
        <meta name="description" content="Aeronexa AI Agents Platform" />
      </Head>

      <Navbar />
      <main className={styles.main}>
        <h1>Aeronexa Travel Assistant</h1>
        {!user ? (
          <div className="card">
            <p>Please <a href="/login">sign in with Google</a> to use search features.</p>
          </div>
        ) : (
          <>
            <div className="card">
              <div style={{ marginTop: 12 }}>
                <label htmlFor="origin">From: </label>
                <input id="origin" value={origin} onChange={(e)=>setOrigin(e.target.value)} placeholder="Your departing/current location" />
              </div>
              <div style={{ marginTop: 8 }}>
                <label htmlFor="destination">To: </label>
                <input id="destination" value={destination} onChange={(e)=>setDestination(e.target.value)} placeholder="Destination city" />
              </div>
              <div style={{ marginTop: 8 }}>
                <label htmlFor="departDate">Date: </label>
                <input id="departDate" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
              </div>
              <div style={{ marginTop: 12 }}>
                <button className="button" onClick={search} disabled={loading}>Search</button>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
          {loading && <div>Loading...</div>}
          {history.length > 0 && (
            <div className="card">
              <h3>Search History</h3>
              {history.map((h,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:4}}>
                  <div
                    role="button"
                    tabIndex={0}
                    style={{cursor:'pointer'}}
                    onClick={()=>{
                      setOrigin(h.origin)
                      setDestination(h.destination)
                      if(h.departDate) setDate(h.departDate)
                      search()
                    }}
                    onKeyDown={(e)=>{
                      if(e.key==='Enter'||e.key===' ') {
                        setOrigin(h.origin)
                        setDestination(h.destination)
                        if(h.departDate) setDate(h.departDate)
                        search()
                      }
                    }}
                    aria-label={`Re-run search: ${h.origin} to ${h.destination}`}
                  >
                    {h.origin} → {h.destination} ({h.departDate || 'any date'})
                  </div>
                  <button className="button" style={{fontSize:'0.8rem'}} onClick={() => deleteHistoryItem(h.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          {result && (
            <div>
              <h2>Results</h2>
              <div className="card">
                <h3>Transport</h3>
                {result.transport?.map((t:any,i:number)=>(
                  <div key={i}><a href={t.link} target="_blank" rel="noreferrer">{t.provider} ({t.type})</a></div>
                ))}
              </div>

              <div className="card">
                <h3>Hotels</h3>
                <div>Search Links: <a href={result.hotels.searchLinks.booking} target="_blank" rel="noreferrer">Booking</a> | <a href={result.hotels.searchLinks.expedia} target="_blank" rel="noreferrer">Expedia</a></div>
                <div style={{ marginTop: 4 }}>
                <label htmlFor="hotelSort">Sort by: </label>
                <select id="hotelSort" value={hotelSort||''} onChange={e=>setHotelSort(e.target.value as any)}>
                  <option value="">none</option>
                  <option value="price">price</option>
                  <option value="rating">rating</option>
                </select>
              </div>
              {(result.hotels.sample||[]).sort((a:any,b:any)=>{
                if (hotelSort==='price') return a.price - b.price
                if (hotelSort==='rating') return b.rating - a.rating
                return 0
              }).map((h:any,i:number)=>(
                <div key={i}><a href={h.link} target="_blank" rel="noreferrer">{h.name}</a> — {h.rating}★ — ${h.price}</div>
              ))}
              </div>

              <div className="card">
                <h3>Attractions</h3>
                {result.attractions?.map((a:any,i:number)=>(
                  <div key={i}><a href={a.url} target="_blank" rel="noreferrer">{a.title}</a> — {a.safety} — <a href={a.gcalLink} target="_blank" rel="noreferrer">Add to Google Calendar</a></div>
                ))}
              </div>

              <div className="card">
                <h3>Weather</h3>
                <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result.weather.daily?.slice(0,3), null, 2)}</pre>
              </div>

              <div className="card">
                <h3>News</h3>
                <div>Safety: {result.news.safety}</div>
                {result.news.results?.map((n:any,i:number)=>(
                  <div key={i}><a href={n.link} target="_blank" rel="noreferrer">{n.title}</a> — {n.pubDate}</div>
                ))}
              </div>

            </div>
          )}
        </div>
        </>
        )}
      </main>
    </div>
  )
}
