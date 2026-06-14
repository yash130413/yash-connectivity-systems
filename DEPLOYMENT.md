# Deployment Guide — Yash Connectivity Systems

This document covers deploying the Yash Connectivity Systems web application to AWS. The architecture splits the **frontend** (Vite + React SPA) and **backend** (Express API) into separate services.

## Architecture Overview

| Component | Technology | Recommended AWS Service |
|-----------|------------|-------------------------|
| Frontend | Vite + React SPA | **AWS Amplify Hosting** |
| Backend API | Express + Node.js 20+ | **EC2** or **Elastic Beanstalk** |
| Database | MongoDB Atlas | External (already hosted) |
| Product images | Local disk (`backend/uploads/`) | EC2 volume (or migrate to S3 later) |
| Email | Resend | External API |

```
Browser ──► Amplify (static SPA)
                │
                └──► EC2 API (:3001) ──► MongoDB Atlas
                              │
                              └──► /uploads (product images)
```

## Prerequisites

- MongoDB Atlas cluster with connection string
- Resend account with verified sending domain (production)
- AWS account with Amplify and EC2/Beanstalk access
- Domain name (optional but recommended)

---

## 1. Backend Deployment (EC2 / Elastic Beanstalk)

### Environment Variables

Copy `backend/.env.example` to `backend/.env` and set all values:

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Min 32 characters; used for admin auth tokens |
| `CORS_ORIGIN` | Yes (prod) | Frontend URL, e.g. `https://www.yourdomain.com` |
| `PORT` | No | Default `3001` |
| `NODE_ENV` | Yes (prod) | Set to `production` |
| `RESEND_API_KEY` | Yes | Resend API key for quote notifications |
| `RESEND_FROM_EMAIL` | Yes (prod) | Verified sender, e.g. `Yash Connectivity Systems <noreply@yourdomain.com>` |
| `BUSINESS_EMAIL` | Yes | Recipient for new lead notifications |
| `ALLOW_ADMIN_SEED` | No | Set `true` only for initial admin creation, then disable |
| `TRUST_PROXY` | No | Set `true` when behind a reverse proxy / load balancer |

### Build and Run

```bash
cd backend
npm ci
npm run build
npm start
```

### PM2 (recommended for EC2)

```bash
cd backend
npm run build
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

### Uploads Directory

Product images are stored in `backend/uploads/`. Ensure this directory:

- Exists and is writable by the Node process
- Persists across deploys (not wiped on restart)
- Is included in backups

The application uses absolute paths for all upload operations, so the API works regardless of the working directory used to start the process.

### Reverse Proxy (Nginx example)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Set `TRUST_PROXY=true` when using a reverse proxy so rate limiting and IP logging work correctly.

### Health Check

```bash
curl https://api.yourdomain.com/health
# Expected: {"status":"ok","message":"Server is running","database":"connected"}
```

### Database Indexes

Indexes are created automatically on server startup:

- `leads.createdAt` (descending) — admin lead listing
- `products.slug` (unique) — product lookups
- `admins.email` (unique) — admin login

---

## 2. Frontend Deployment (AWS Amplify)

### Connect Repository

1. Open **AWS Amplify Console** → **New app** → **Host web app**
2. Connect your Git provider and select this repository
3. Amplify detects `amplify.yml` at the repo root automatically

### Environment Variables

In Amplify → **App settings** → **Environment variables**, add:

| Variable | Example | Notes |
|----------|---------|-------|
| `VITE_API_URL` | `https://api.yourdomain.com` | **Build-time** variable; must point to production API |

> **Important:** `VITE_API_URL` is baked into the build. Changing it requires a rebuild/redeploy.

### SPA Routing (Rewrites)

React Router requires all routes to serve `index.html`. In Amplify Console → **Hosting** → **Rewrites and redirects**, add:

| Source | Target | Type |
|--------|--------|------|
| `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>` | `/index.html` | 200 (Rewrite) |

Or use the simpler catch-all rule:

| Source | Target | Type |
|--------|--------|------|
| `/<*>` | `/index.html` | 404-200 |

### Build Output

Amplify builds with `npm ci && npm run build` and serves files from the `dist/` directory per `amplify.yml`.

---

## 3. CORS and Cross-Origin Images

The backend configures:

- **CORS** via `CORS_ORIGIN` for API requests
- **Helmet** with `crossOriginResourcePolicy: cross-origin` so product images at `/uploads/*` load from the Amplify frontend domain

Ensure `CORS_ORIGIN` exactly matches your Amplify app URL (including `https://` and no trailing slash mismatch).

---

## 4. Resend Email Setup

See `backend/RESEND_SETUP.md` for detailed Resend configuration.

**Production checklist:**

1. Verify your domain in Resend
2. Set `RESEND_FROM_EMAIL` to an address on that domain
3. Set `RESEND_API_KEY` and `BUSINESS_EMAIL`
4. Submit a test quote form and confirm both business and customer emails arrive

---

## 5. Initial Admin Setup

1. Set `ALLOW_ADMIN_SEED=true` in backend env
2. Start the API — the seed endpoint creates the default admin if none exists
3. Log in via `/admin/login`
4. Set `ALLOW_ADMIN_SEED=false` and restart

---

## 6. Deployment Checklist

### Backend
- [ ] All env vars set (see table above)
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGIN` matches frontend URL
- [ ] `JWT_SECRET` is strong (32+ chars)
- [ ] `RESEND_FROM_EMAIL` uses verified domain
- [ ] `ALLOW_ADMIN_SEED=false` after initial setup
- [ ] `backend/uploads/` is persistent and writable
- [ ] HTTPS enabled (via Nginx/ALB + ACM certificate)
- [ ] `/health` returns `database: connected`

### Frontend
- [ ] `VITE_API_URL` set to production API URL in Amplify
- [ ] SPA rewrite rule configured
- [ ] Build succeeds in Amplify console
- [ ] All pages load (test `/products`, `/admin/login`)
- [ ] Product images display correctly
- [ ] Quote form submits and emails send

### Security
- [ ] `.env` files not committed to git
- [ ] MongoDB Atlas IP allowlist configured
- [ ] Admin seed disabled in production
- [ ] Rate limiting active (default: enabled)

---

## 7. Local Development

```bash
# Terminal 1 — Backend
cd backend
cp .env.example .env   # fill in values
npm install
npm run dev

# Terminal 2 — Frontend
cp .env.example .env   # VITE_API_URL=http://localhost:3001
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3001`

---

## 8. Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| API calls fail with CORS error | `CORS_ORIGIN` mismatch | Match exact frontend URL in backend env |
| Product images broken | Wrong `VITE_API_URL` or CORP headers | Rebuild frontend with correct API URL; verify `/uploads` serves images |
| 404 on page refresh | Missing SPA rewrite | Add Amplify rewrite rule |
| Emails not sending | Missing/invalid Resend config | Check `RESEND_API_KEY` and `RESEND_FROM_EMAIL` |
| Admin login fails | JWT or DB issue | Verify `JWT_SECRET`, MongoDB connection, admin exists |
| Upload delete fails | Upload dir permissions | Ensure `backend/uploads/` is writable |

---

## 9. Future Infrastructure Improvements

These are **not** implemented in the current codebase but recommended for scale:

- Migrate product images to **Amazon S3** + CloudFront
- Use **AWS Secrets Manager** for env secrets
- Add **CloudWatch** logging and alarms
- Use **Application Load Balancer** with auto-scaling
- Add CI/CD pipeline (GitHub Actions → Amplify + EC2)
