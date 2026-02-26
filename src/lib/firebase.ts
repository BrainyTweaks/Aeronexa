import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
}

let app: any = null
let db: any = null
let auth: any = null
let googleProvider: any = null

if (firebaseConfig.apiKey) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  db = getFirestore(app)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  // request Google Calendar scope as well
  googleProvider.addScope('https://www.googleapis.com/auth/calendar.events')
}

export { db, auth, googleProvider }

export function loginWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error('Firebase not initialized')
  }
  return signInWithPopup(auth, googleProvider)
}

export function logout() {
  if (!auth) {
    throw new Error('Firebase not initialized')
  }
  return signOut(auth)
}
