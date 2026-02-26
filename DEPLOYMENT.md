# DEPLOYMENT.md

## Quick Deploy to Vercel

### Prerequisites
- GitHub account with the Aeronexa repo
- Vercel account (free at vercel.com)
- Firebase project configured
- Environment variables ready

### Step 1: Prepare Environment Variables

Create a `.env.local` file locally with all required variables:

```bash
# Firebase (get from Firebase console)
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Service account for server-side operations (download JSON from Firebase)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# HuggingFace for embeddings/generation
HUGGINGFACE_API_KEY=hf_xxx

# Google APIs (optional)
GOOGLE_CALENDAR_API_KEY=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

### Step 2: Build and Test Locally

```bash
npm install
npm run build
npm test
```

Ensure no errors before proceeding.

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 4: Connect Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import the Aeronexa repository
4. Vercel auto-detects Next.js configuration

### Step 5: Add Environment Variables in Vercel

1. In Vercel dashboard, go to **Settings > Environment Variables**
2. Add each variable from your `.env.local`:
   - Regular vars (API keys) can be pasted as-is
   - `FIREBASE_SERVICE_ACCOUNT`: paste as JSON string (entire service account JSON)
3. Make sure variables are available for all environments (Production, Preview, Development)

### Step 6: Deploy

1. Click "Deploy" button
2. Vercel automatically:
   - Installs dependencies
   - Runs `npm run build`
   - Deploys to production

Your app will be live at `https://yourproject.vercel.app`

### Step 7: Post-Deployment Verification

1. **Update Firebase Authorized Domains:**
   - Go to Firebase Console > Authentication > Settings
   - Add your Vercel URL (e.g., `yourproject.vercel.app`) to authorized domains

2. **Test Critical Paths:**
   - Visit the app homepage
   - Test Google login at `/login`
   - Run a travel search from `/`
   - Check search history display
   - Visit `/status` to verify API connectivity
   - Check `/api-docs` for endpoint documentation

3. **Monitor Logs:**
   - Go to Vercel dashboard > Deployments > Logs
   - Check for any runtime errors

### Troubleshooting

**Firebase Auth Errors:**
- Verify `FIREBASE_SERVICE_ACCOUNT` is a valid JSON string
- Ensure Firebase authorized domains include your Vercel URL

**History/Firestore Errors:**
- Confirm `FIREBASE_SERVICE_ACCOUNT` is set (required for server-side Firestore)
- Check Firestore rules allow reads/writes for authenticated users

**API Timeouts:**
- Check `/status` page to see which agents are failing
- Verify HuggingFace API key is valid
- Ensure Open-Meteo and Nominatim are accessible (usually always up)

---

### Continuous Deployment

Any push to the main branch automatically triggers a new Vercel build.  
To pause deployments, go to Settings > Deployments > Auto-deployments and disable.

### Rollback

Click the previous deployment in Vercel dashboard and select "Redeploy".
