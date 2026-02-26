# 🚀 START HERE — Aeronexa

Welcome! You're looking at a **complete, production-ready travel AI platform** built with Next.js, React, Firebase, and AI agents.

## ⏱️ 30-Second Overview

Aeronexa uses **6 AI agents** working together to help users plan trips:

```
User inputs: "Paris, April 15-20"
        ↓
Master Orchestrator (coordinates everything)
        ↓
┌───────┼────────┬───────────┬─────────┬──────┐
│       │        │           │         │      │
v       v        v           v         v      v
🛫      🏨      🎭           🌡️       📰    💬
Transport Hotels Attractions Weather News  Chat
│       │        │           │         │      │
└───────┴────────┴───────────┴─────────┴──────┘
        ↓
Results: Flights, hotels, attractions, 
         weather, news, history saved
```

## 📖 Documentation (Read in This Order)

1. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** ← **Start here for full overview**
   - What was built, statistics, highlights, deployment checklist

2. **[QUICK_START.md](./QUICK_START.md)** ← Get running in 5 minutes
   - Clone → Configure → Run locally → Deploy

3. **[README.md](./README.md)** ← Project setup and features
   - Dependencies, authentication, testing, CI/CD

4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** ← Deploy to production
   - Step-by-step Vercel deployment guide with screenshots-ready format

5. **In-app docs:**
   - Visit `/api-docs` for all API endpoints
   - Visit `/status` for system health checks

## 🎯 What You Need Right Now

### Just Want to See It Running?
```bash
# 1. Setup environment
cp .env.local.example .env.local
# 2. Fill in your API keys from Firebase, HuggingFace, Google

# 3. Install and run
npm install
npm run dev

# 4. Open http://localhost:3000
# Click "Sign in with Google" and search for a destination!
```

### Want to Deploy?
See **[DEPLOYMENT.md](./DEPLOYMENT.md)** — takes ~5 minutes with Vercel.

### Want to Understand the Code?
1. Main UI: `src/pages/index.tsx`
2. Travel search orchestration: `src/pages/api/agents/master.ts`
3. Individual agents: `src/lib/agents/*.ts`
4. Frontend pages: `src/pages/*.tsx`
5. Styling: `styles/globals.css`

## 🗂️ Project Structure at a Glance

```
aeronexa/
├── 📄 PROJECT_SUMMARY.md      ← Full project overview (START HERE)
├── 📄 QUICK_START.md          ← 5-min quickstart
├── 📄 DEPLOYMENT.md           ← Vercel deployment guide
├── 📄 README.md               ← Setup & features
│
├── src/pages/
│   ├── index.tsx              ← Main travel search UI ⭐
│   ├── chat.tsx               ← Chat with AI
│   ├── login.tsx              ← Google authentication
│   ├── status.tsx             ← System health
│   ├── api-docs.tsx           ← API documentation
│   └── api/
│       ├── agents/
│       │   ├── master.ts      ← Orchestrator (coordinates all agents)
│       │   ├── conversational.ts  ← Chat agent
│       │   ├── ingest.ts      ← Document storage
│       │   └── ...
│       ├── history.ts         ← User search history
│       └── health.ts          ← System status checks
│
├── src/lib/
│   ├── agents/
│   │   ├── transport.ts       ← ✈️ Flights & trains
│   │   ├── hotels.ts          ← 🏨 Accommodations
│   │   ├── attractions.ts     ← 🎭 Things to do
│   │   ├── weatherAgent.ts    ← 🌡️ Weather forecasts
│   │   └── newsAgent.ts       ← 📰 Safety news
│   ├── firebase.ts            ← Auth setup
│   ├── firebaseAdmin.ts       ← Server-side Firestore
│   └── vectorStore.ts         ← Document storage
│
├── styles/
│   ├── globals.css            ← Global styling
│   └── Home.module.css        ← Component styles
│
├── __tests__/
│   └── agents.test.ts         ← Jest tests
│
├── .github/workflows/
│   └── ci.yml                 ← GitHub Actions CI/CD
│
├── package.json               ← Dependencies
├── tsconfig.json              ← TypeScript config
├── next.config.js             ← Next.js config
└── .env.local.example         ← Environment variables template
```

## 🎓 Key Concepts

### How It Works (User Perspective)
1. **User logs in** with Google
2. **Enters trip details** (from, to, date)
3. **Clicks search** → Master agent coordinates all 6 specialists
4. **Results appear** in organized cards:
   - Transport options with links
   - Hotels sorted by price/rating
   - Attractions with safety ratings
   - Weather forecast
   - Safety news
   - Search saved to history for later
5. **Click history entry** to re-run search
6. **Delete history** entries for privacy

### How It Works (Developer Perspective)
1. **Frontend** (React) sends request to `/api/agents/master`
2. **Master orchestrator** geocodes locations, runs all agents in parallel
3. **Agents fetch data:**
   - Transport: Skyscanner links via API
   - Hotels: Search URLs with filters
   - Attractions: Wikipedia geosearch
   - Weather: Open-Meteo API
   - News: Google News RSS/API
4. **Combine results** and return to frontend
5. **Save to Firestore** for history
6. **Render** results as cards

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Backend | Next.js 13 + Node.js |
| Database | Firestore (users/history) |
| Vector DB | JSON file (dev) / Pinecone (prod) |
| Auth | Firebase + Google OAuth |
| Models | HuggingFace (embeddings/chat) |
| APIs | Open-Meteo, Nominatim, Wikipedia, Google |
| Testing | Jest + supertest |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

## 📋 What's Already Done

✅ All 6 specialist agents implemented  
✅ Master orchestrator coordinates everything  
✅ Frontend with search, history, chat, ingest, search, login pages  
✅ User authentication with Google OAuth  
✅ Search history saved to Firestore  
✅ API documentation page  
✅ System health checks  
✅ Responsive design (mobile/tablet/desktop)  
✅ Accessibility (labels, keyboard nav)  
✅ Jest tests with auth checks  
✅ GitHub Actions CI/CD workflow  
✅ Build optimizations (189 kB JS)  
✅ Comprehensive documentation  
✅ Vercel deployment ready  

## 🚀 Next Steps

### Option A: Run Locally (Now)
```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your API keys
npm run dev
# Visit http://localhost:3000
```

### Option B: Deploy to Production (5 mins)
See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Option C: Customize & Extend
- **Change agents?** Edit `src/lib/agents/*.ts`
- **Add pages?** Create files in `src/pages/`
- **Change styling?** Edit `styles/globals.css`
- **Swap model provider?** Update `src/lib/hf.ts`
- **Add features?** Add to `src/pages/api/`

## 💡 Quick Examples

### Change Hotel Sort Order
File: `src/lib/agents/hotels.ts`
```typescript
// Default sort by price, change to rating
return results.sort((a, b) => b.rating - a.rating)
```

### Add New Agent
1. Create `src/lib/agents/myagent.ts`
2. Export main function
3. Add to `src/pages/api/agents/master.ts`
4. Test via `/api-docs`

### Change Styling
File: `styles/globals.css`
```css
.card {
  background: #fff;
  /* Modify these properties */
}
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Error: Firebase not initialized` | Fill in `.env.local` with Firebase config |
| `API endpoints returning 500` | Check `/status` page, verify API keys |
| `Search history not showing` | Ensure `FIREBASE_SERVICE_ACCOUNT` is set |
| `Build failing` | Run `npm install` to ensure all deps |
| `Tests failing` | Delete `.next/` and rebuild: `npm run build` |

## 📞 Need Help?

1. **See full project overview:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
2. **Quick setup guide:** [QUICK_START.md](./QUICK_START.md)
3. **Deployment help:** [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **API endpoints:** Visit `/api-docs` when app is running
5. **System health:** Visit `/status` to check all agents
6. **Code:** Files have comments, start with `src/pages/index.tsx`

## ✨ What Makes This Special

- **Complete:** Everything from agents to UI to deployment
- **Production-Ready:** Tests, CI/CD, error handling, security
- **Well-Documented:** 5 markdown guides + in-app docs
- **Easy to Customize:** Modular design, clear separation of concerns
- **Scalable:** Vercel auto-scaling, Firestore handles millions
- **Modern Stack:** Latest Next.js, React, TypeScript, Firebase

## 🎯 TL;DR

1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) (2 mins)
2. Run `npm install && npm run dev` (1 min)
3. Visit http://localhost:3000 (10 seconds)
4. Sign in with Google (5 seconds)
5. Search for a trip (10 seconds)
6. See 6 agents work together ✨

**That's it! Everything works out of the box.**

---

**Questions?** All documentation is in markdown files. Start with [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md).

**Ready to deploy?** Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to go live in 5 minutes.

**Time to build something amazing!** 🚀
