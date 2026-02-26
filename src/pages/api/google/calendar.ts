import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

// This route will use server-side OAuth flow to access Google Calendar.
// TODO: Implement OAuth redirect and token storage (Firebase) in next steps.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Google Calendar API placeholder — implement OAuth flow' })
}
