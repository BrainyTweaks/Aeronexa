import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { adminAuth, adminDb } from '../../lib/firebaseAdmin'

async function verifyToken(req: NextApiRequest) {
  const auth = req.headers.authorization || ''
  if (!auth.startsWith('Bearer ')) {
    throw new Error('no bearer token')
  }
  const idToken = auth.split(' ')[1]
  const decoded = await adminAuth.verifyIdToken(idToken)
  return decoded.uid
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const uid = await verifyToken(req)
    const userRef = adminDb.collection('users').doc(uid).collection('history')

    if (req.method === 'POST') {
      const { origin, destination, departDate, result } = req.body || {}
      if (!origin || !destination) {
        return res.status(400).json({ error: 'origin/destination required' })
      }
      const entry = {
        origin,
        destination,
        departDate: departDate || null,
        result: result || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
      await userRef.add(entry)
      return res.status(200).json({ success: true })
    }

    if (req.method === 'GET') {
      const snapshot = await userRef.orderBy('createdAt', 'desc').limit(20).get()
      const items: any[] = []
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() })
      })
      return res.status(200).json({ history: items })
    }

    if (req.method === 'DELETE') {
      const { id } = req.body || {}
      if (!id) return res.status(400).json({ error: 'id required' })
      await userRef.doc(id).delete()
      return res.status(200).json({ success: true })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end()
  } catch (err: any) {
    console.error('history api error', err)
    const status = err.message && err.message.includes('token') ? 401 : 500
    return res.status(status).json({ error: err.message || String(err) })
  }
}
