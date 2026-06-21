# Deploy CodeCraft to Production

This guide walks through deploying the SaaS code editor to **Vercel** with **Convex** (backend) and **Clerk** (auth).

## Architecture

```text
Browser → Vercel (Next.js 15) → Convex (database + webhooks)
                ↓
         Clerk (authentication)
                ↓
         Piston API (code execution)
```

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Vercel account](https://vercel.com)
- [Convex account](https://convex.dev)
- [Clerk account](https://clerk.com)

---

## Step 1: Local setup

```bash
cd A-SaaS-Code-Editor-with-Next.js-15---React.js-main
npm install
cp .env.example .env.local
```

---

## Step 2: Convex backend

1. Log in and link the project:

```bash
npx convex dev
```

2. Copy the deployment URL printed by Convex into `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

3. Set Convex environment variables (replace with your Clerk issuer domain):

```bash
npx convex env set CLERK_JWT_ISSUER_DOMAIN https://your-app.clerk.accounts.dev
npx convex env set CLERK_WEBHOOK_SECRET whsec_...
npx convex env set LEMON_SQUEEZY_WEBHOOK_SECRET your_secret
```

4. Deploy Convex to production:

```bash
npm run convex:deploy
```

---

## Step 3: Clerk authentication

1. Create an application at [dashboard.clerk.com](https://dashboard.clerk.com).
2. Add these keys to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

3. In Clerk → **JWT Templates**, create a template named `convex` (Convex docs preset).
4. Copy your Clerk **Frontend API** URL (e.g. `https://your-app.clerk.accounts.dev`) and set:

```env
CLERK_JWT_ISSUER_DOMAIN=https://your-app.clerk.accounts.dev
```

5. In Clerk → **Webhooks**, add endpoint:

```text
https://YOUR_CONVEX_DEPLOYMENT.convex.site/clerk-webhook
```

Subscribe to `user.created` and copy the signing secret to `CLERK_WEBHOOK_SECRET`.

6. Set redirect URLs in Clerk:

- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-in: `/`

---

## Step 4: Deploy to Vercel

### Option A: Vercel Dashboard (recommended)

1. Push this repo to GitHub.
2. Import the project in [vercel.com/new](https://vercel.com/new).
3. Set **Root Directory** to `A-SaaS-Code-Editor-with-Next.js-15---React.js-main` if the repo has a nested folder.
4. Add environment variables from `.env.example`.
5. Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Add env vars when prompted or in the Vercel project settings.

### Required Vercel environment variables

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes |
| `CLERK_SECRET_KEY` | Yes |
| `NEXT_PUBLIC_APP_URL` | Yes (your Vercel URL) |
| `OPENAI_API_KEY` | Optional (AI explain) |
| `NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL` | Optional (Pro billing) |

---

## Step 5: Lemon Squeezy (optional Pro billing)

1. Create a product in [Lemon Squeezy](https://lemonsqueezy.com).
2. Set checkout URL in Vercel:

```env
NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL=https://your-store.lemonsqueezy.com/checkout/buy/...
```

3. Add webhook in Lemon Squeezy pointing to:

```text
https://YOUR_CONVEX_DEPLOYMENT.convex.site/lemon-squeezy-webhook
```

4. Set `LEMON_SQUEEZY_WEBHOOK_SECRET` in Convex.

---

## Step 6: Verify deployment

After deploy, confirm:

- [ ] Home page loads and Monaco editor appears
- [ ] **Run Code** executes JavaScript via Piston
- [ ] Sign in / sign up works at `/sign-in` and `/sign-up`
- [ ] Snippets page loads from Convex
- [ ] Profile shows execution history when signed in
- [ ] Pro upgrade link opens Lemon Squeezy checkout (if configured)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank editor / Convex errors | Check `NEXT_PUBLIC_CONVEX_URL` in Vercel |
| Auth not working | Verify Clerk keys and JWT template named `convex` |
| Users not saved to DB | Check Clerk webhook URL and `CLERK_WEBHOOK_SECRET` in Convex |
| Build fails on Vercel | Ensure Node 20+ and run `npm run build` locally first |
| Pro not unlocking | Verify Lemon Squeezy webhook and user email matches Clerk |

---

## Alternative hosts

The app is a standard Next.js 15 project. You can also deploy to:

- **Netlify** – set build command `npm run build`, publish `.next`
- **Railway / Render** – use `npm run build && npm start`
- **Docker** – multi-stage build with `node:20-alpine`

Convex and Clerk remain the same regardless of frontend host.
