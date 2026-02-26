import admin from 'firebase-admin'

// initialize once
if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    } catch (e) {
      console.warn('Failed to parse FIREBASE_SERVICE_ACCOUNT, falling back to application default credentials', e)
      admin.initializeApp({
        credential: admin.credential.applicationDefault()
      })
    }
  } else {
    // try default credentials (e.g., in Google Cloud / Vercel environment)
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })
  }
}

export const adminAuth = admin.auth()
export const adminDb = admin.firestore()
