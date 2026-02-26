# Aeronexa — Travel AI Agents Platform
## Project Summary & Quick Start

### What's Inside

**Aeronexa** is a complete Next.js + React application with six AI agents that help users plan trips by searching for:
- ✈️ **Transport** — Flights and train options
- 🏨 **Hotels** — Accommodations with ratings, prices, and sorting
- 🎭 **Attractions** — Must-see places with safety ratings and Google Calendar integration
- 🌡️ **Weather** — Forecasts and travel timing recommendations
- 📰 **News** — Local safety alerts and travel advisories
- 💬 **Conversational** — Natural language chat about travel

Plus:
- 🔐 **Authentication** via Google with Firebase
- 📊 **Search History** stored per-user in Firestore
- 🧪 **Tests** via Jest
- 🚀 **CI/CD** with GitHub Actions
- 📚 **API Docs** and System Status pages

---

### Quick Start (5 Minutes)

1. **Clone & Install:**
   ```bash
   git clone https://github.com/your-org/aeronexa
   cd aeronexa
   npm install
   ```

2. **Configure Env:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Firebase, HuggingFace, and Google API keys
   ```

3. **Run Locally:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

4. **Build & Test:**
   ```bash
   npm run build
   npm test
   ```

5. **Deploy to Vercel:**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions
   - Basically: push to GitHub, connect to Vercel, add env vars, deploy!

---

### Project Structure

```
aeronexa/
├── src/
│   ├── pages/
│   │   ├── index.tsx          ← Main travel search UI
│   │   ├── chat.tsx           ← Conversational agent
│   │   ├── ingest.tsx         ← Document ingestion
│   │   ├── search.tsx         ← Vector search
│   │   ├── login.tsx          ← Google auth
│   │   ├── status.tsx         ← System health
│   │   ├── api-docs.tsx       ← API documentation
│   │   ├── api/
│   │   │   ├── agents/
│   │   │   │   ├── master.ts          ← Orchestrator
│   │   │   │   ├── conversational.ts  ← Chat
│   │   │   │   ├── ingest.ts
│   │   │   │   ├── retrieval.ts
│   │   │   │   ├── orchestrator.ts
│   │   │   │   └── clearVectors.ts
│   │   │   ├── history.ts            ← User search history
│   │   │   ├── health.ts             ← Status checks
│   │   │   └── google/calendar.ts
│   ├── lib/
│   │   ├── firebase.ts                ← Client auth
│   │   ├── firebaseAdmin.ts           ← Server-side Firestore
│   │   ├── hf.ts                      ← HuggingFace models
│   │   ├── vectorStore.ts             ← Vector DB
│   │   └── agents/
│   │       ├── transport.ts
│   │       ├── hotels.ts
│   │       ├── attractions.ts
│   │       ├── weatherAgent.ts
│   │       └── newsAgent.ts
│   └── components/
│       └── Navbar.tsx
├── styles/
│   ├── globals.css
│   └── Home.module.css
├── __tests__/
│   └── agents.test.ts
├── .github/workflows/
│   └── ci.yml                 ← GitHub Actions CI
├── README.md                  ← Overview
├── DEPLOYMENT.md              ← Vercel deployment guide
└── package.json
```

---

### Key Technologies

- **Framework:** Next.js 13.5 (React 18.2)
- **Language:** TypeScript
- **Auth:** Firebase + Google OAuth
- **Database:** Firestore (users/history) + JSON vector store (dev)
- **Models:** HuggingFace (embeddings, chat)
- **APIs:** Open-Meteo (weather), Nominatim (geocoding), Wikipedia (attractions)
- **Testing:** Jest + supertest
- **Styling:** CSS Modules + Global CSS
- **Deployment:** Vercel

---

### Environment Variables

See `.env.local.example` for full list. Critical ones:

```
NEXT_PUBLIC_FIREBASE_API_KEY      → Firebase project
FIREBASE_SERVICE_ACCOUNT          → Service account JSON (production/history)
HUGGINGFACE_API_KEY               → Model embeddings/generation
GOOGLE_CALENDAR_API_KEY           → Calendar integration (optional)
```

---

### Features

✅ **Master Orchestrator** — Runs all agents in parallel, geo-codes locations, returns structured results  
✅ **Six Specialist Agents** — Transport, Hotels, Attractions, Weather, News, Conversational  
✅ **User Authentication** — Google login with Firebase  
✅ **Search History** — Per-user in Firestore, click to re-run, delete for privacy  
✅ **Hotel Sorting** — Sort by price or rating  
✅ **API Documentation** — Built-in API docs page  
✅ **System Status** — Health checks for all agents  
✅ **Accessibility** — Labels, keyboard navigation, aria-labels  
✅ **Responsive Design** — Works on desktop and mobile  
✅ **Tests & CI** — Jest tests, GitHub Actions workflow  
✅ **Production Ready** — Deployment guide for Vercel  

---

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/agents/master` | Full travel planning workflow |
| POST | `/api/agents/conversational` | Chat agent |
| POST | `/api/agents/ingest` | Store documents |
| POST | `/api/agents/retrieval` | Search documents |
| GET/POST/DELETE | `/api/history` | User search history (auth required) |
| GET | `/api/health` | System status checks |
| GET | `/api-docs` | API documentation page |

---

### Getting Help

1. **Check the docs:** `/api-docs` page lists all endpoints
2. **See system health:** Visit `/status` to check agent connectivity
3. **View logs:** `npm run dev` shows real-time logs
4. **Deployment issues:** See [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Code:** Files are well-commented; start with `src/pages/index.tsx` for the main UI

---

### Next Steps

1. **Customize:** Update agent logic in `src/lib/agents/`
2. **Add Features:** New pages go in `src/pages/`, new APIs in `src/pages/api/`
3. **Swap Models:** Change HuggingFace to OpenAI or other providers in `src/lib/hf.ts`
4. **Real Vector DB:** Replace `src/lib/vectorStore.ts` with Pinecone or Weaviate
5. **Deploy:** Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Built with ❤️ for travel planning. Ready to deploy!**
