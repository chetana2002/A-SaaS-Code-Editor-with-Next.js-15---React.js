# CodeCraft – SaaS Online Code Editor

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)

CodeCraft is a production-ready **SaaS code editor** — write, run, share, and manage code in the browser with auth, snippets, profiles, and optional Pro billing.

## Features

- **Monaco editor** with themes, font size, auto-save, multi-language support
- **Run code in browser** via Piston API (Ctrl + Enter)
- **Clerk auth** — sign in, profiles, execution history
- **Convex backend** — snippets, comments, stars, Pro status
- **Lemon Squeezy** — optional one-time Pro upgrade
- **AI explain** — optional OpenAI-powered code explanations

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind, Framer Motion |
| Editor | Monaco Editor |
| Backend | Convex |
| Auth | Clerk |
| Execution | Piston API |
| Hosting | Vercel (recommended) |

## Quick start (local)

```bash
npm install
cp .env.example .env.local
# Fill in Clerk + Convex keys (see DEPLOYMENT.md)
npx convex dev   # terminal 1
npm run dev      # terminal 2
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to production

**Full step-by-step guide:** see [DEPLOYMENT.md](./DEPLOYMENT.md)

Summary:

1. Deploy **Convex** (`npm run convex:deploy`)
2. Configure **Clerk** (keys + webhook + JWT template)
3. Deploy **Vercel** (import repo, add env vars from `.env.example`)
4. Optionally configure **Lemon Squeezy** for Pro billing

### Required environment variables

```env
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_APP_URL=
```

See `.env.example` for the complete list.

## Project structure

```text
src/
  app/
    (root)/          # Code editor home
    snippets/        # Community snippets
    profile/         # User dashboard
    pricing/         # Pro plan
    sign-in/         # Clerk auth
    api/explain/     # AI endpoint
  components/
  lib/               # env + convex helpers
convex/              # Database schema & functions
```

## Supported languages

JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, Ruby, Swift

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run convex:dev` | Start Convex dev sync |
| `npm run convex:deploy` | Deploy Convex to production |

## License

MIT — see [LICENSE](./LICENSE).

## Author

**Chetana Dharavathu**
