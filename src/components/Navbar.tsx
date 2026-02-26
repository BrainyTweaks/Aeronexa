import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])
  return (
    <header className="container">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/ingest">Ingest</Link>
        <Link href="/search">Search</Link>
        <Link href="/status">Status</Link>
        <Link href="/api-docs">API Docs</Link>
        {user ? <span>Hi {user.displayName}</span> : <Link href="/login">Login</Link>}
      </nav>
    </header>
  )
}
