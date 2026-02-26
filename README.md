# Aeronexa — Project scaffold

> **👉 [START_HERE.md](./START_HERE.md) — Read this first for a complete overview!**

This repository contains a Next.js scaffold for the Aeronexa agents platform. It targets Vercel hosting and uses Firebase for storage. Integrations included as placeholders:

- Google Calendar (OAuth + API)
- Weather data via Open-Meteo (free)
- Model provider (Hugging Face / OpenAI) — pluggable

Getting started

1. Copy `.env.local.example` to `.env.local` and fill values. Key environment variables include:
   - `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc. (Firebase config for auth & Firestore)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` for Calendar OAuth
   - `HUGGINGFACE_API_KEY` for model inference/embeddings
   - `GOOGLE_CALENDAR_API_KEY` if using direct calendar API calls
   - `PUBLIC_WEATHER_API_URL` (optional) to override the Open-Meteo endpoint
   - `FIREBASE_SERVICE_ACCOUNT` **(optional)** JSON string of a service account key for server-side Firestore/auth operations; required to use search history or deploy to production.

2. Install dependencies:

```bash
npm install
```

3. Run the dev server:

```bash
npm run dev
```

### Authentication

This project uses Firebase for Google login (Calendar scope). Set the `.env.local` values and visit `/login` to sign in with Google. After login you can access the travel search UI and use calendar links.

### Testing & CI

- Run `npm test` to execute Jest unit tests (sample provided).
- A basic GitHub Actions workflow is included at `.github/workflows/ci.yml` to run lint, tests, and build on pushes.

Next steps: implement remaining agent features, polish UI, deploy to Vercel.

### Deployment

This app is designed for seamless deployment on [Vercel](https://vercel.com/). To deploy:

1. **Prepare the repository:**
   - Ensure all environment variables are configured in `.env.local`.
   - Run `npm run build` and `npm test` locally to verify everything works.
   - Commit and push to GitHub.

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com/) and log in.
   - Click "New Project" and select the Aeronexa repository.
   - Vercel will auto-detect it's a Next.js project.

3. **Configure Environment Variables:**
   - In the Vercel dashboard, go to Settings > Environment Variables.
   - Add all variables from your `.env.local`, including `FIREBASE_SERVICE_ACCOUNT` as a JSON string (e.g., `{"type":"service_account",...}`).
   - For sensitive keys, Vercel securely encrypts them.

4. **Deploy:**
   - Click "Deploy"; Vercel automatically runs `npm install`, `npm run build`, and serves the app.
   - Your app is now live at `yourproject.vercel.app`.

5. **Post-Deployment:**
   - Update Firebase authorized domains to include your Vercel URL.
   - Test the app end-to-end (login, search, history, etc.).

### Alternative Hosting

The app can also be hosted on other Node-compatible platforms (AWS, Google Cloud, etc.); just ensure:
- Node.js >= 18 is installed.
- All environment variables are set (including `FIREBASE_SERVICE_ACCOUNT`).
- Run `npm run build` to create the optimized build in `.next/`.
- Start the app with `npm start`.

---

📝 **Note:** This scaffold uses a simple JSON-backed vector store (`vectors.json`) for development. For production, consider integrating a managed vector database (e.g., Pinecone, Weaviate) or Firestore collection.

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment instructions to Vercel.**

### Features added

- Hotel results can now be sorted by price or rating.
- Ingest page includes button to clear stored vectors.
- Basic navigation bar across all pages.
- Google login required to access search UI.
- **Search history** stored per user in Firestore and viewable on the home page (requires `FIREBASE_SERVICE_ACCOUNT`). Entries can also be deleted by the user for privacy.

