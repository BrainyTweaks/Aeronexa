import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { auth, loginWithGoogle, logout } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function LoginPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
  }, [])

  if (user) {
    return (
      <div className="container">
        <Navbar />
        <div style={{ padding: 24 }}>
          <div className="card">
            <h1>Welcome, {user.displayName}</h1>
            <button className="button" onClick={() => logout()}>Log out</button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: 24 }}>
      <div className="card">
        <h1>Login</h1>
        <button className="button" onClick={() => loginWithGoogle()}>Sign in with Google (Calendar)</button>
      </div>
    </div>
  )
}
