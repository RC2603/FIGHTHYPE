# 🚀 Deployment Guide - FIGHTHYPE AI Boxing Analysis

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Why Vercel (Not GitHub Pages)](#why-vercel-not-github-pages)
- [Method 1: Deploy to Vercel (Recommended)](#method-1-deploy-to-vercel-recommended)
- [Method 2: Deploy to Netlify](#method-2-deploy-to-netlify)
- [Method 3: GitHub Pages + External API](#method-3-github-pages--external-api)
- [Environment Variables](#environment-variables)
- [Post-Deployment Testing](#post-deployment-testing)
- [Troubleshooting](#troubleshooting)

---

## ⚠️ Why Vercel (Not GitHub Pages)?

**GitHub Pages is NOT suitable for this project because:**
- ❌ Only supports static sites (HTML/CSS/JS)
- ❌ No server-side code execution
- ❌ Cannot run API routes (`/api/analyze-boxing`)
- ❌ Cannot execute z-ai-web-dev-sdk (requires server)
- ❌ No support for Next.js App Router server components

**Vercel is PERFECT because:**
- ✅ Built by Next.js creators
- ✅ Full Next.js support (App Router, API routes, Server Actions)
- ✅ Free tier with generous limits
- ✅ Auto-deploy from GitHub
- ✅ Serverless functions for API routes
- ✅ Built-in edge network
- ✅ Supports large file uploads (100MB+)
- ✅ Zero configuration required

---

## 🚀 Method 1: Deploy to Vercel (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Fill in repository details:
   - **Repository name**: `fighthype-ai-boxing` (or your preferred name)
   - **Description**: AI-powered boxing video analysis
   - **Visibility**: Public or Private (your choice)
4. Click **Create repository**

### Step 2: Push Your Code to GitHub

Run these commands in your project directory:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fighthype-ai-boxing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Your account
# - Link to existing project? → No
# - What's your project's name? → fighthype-ai-boxing
# - In which directory is your code located? → ./ (default)
# - Want to override the settings? → No
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New** → **Project**
3. Click **Import** next to your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `bun run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `bun install`
5. Click **Deploy**

### Step 4: Configure Environment Variables

After deployment:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add your z-ai-web-dev-sdk credentials (if required):
   - `ZAI_API_KEY`: Your API key (if needed)

**Note**: If z-ai-web-dev-sdk doesn't require explicit keys, you can skip this step.

### Step 5: Update Max Duration for Large Files

For 100MB video uploads, the API needs more time:

1. Go to **Settings** → **Functions** in Vercel Dashboard
2. Set **Max Duration** to `60` seconds (or higher if needed)

### Step 6: Test Your Deployment

1. Wait for deployment to complete (you'll get a URL like `https://fighthype-ai-boxing.vercel.app`)
2. Open the URL in your browser
3. Test uploading a video file

### Step 7: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `app.fighthype.ai`)
3. Follow the DNS instructions
4. Your app is now live! 🎉

---

## 🚀 Method 2: Deploy to Netlify

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com) and sign up
2. Connect your GitHub account

### Step 2: Import Repository

1. Click **Add new site** → **Import an existing project**
2. Select your GitHub repository
3. Configure build settings:
   ```
   Build command: bun run build
   Publish directory: .next
   ```

### Step 3: Deploy

Click **Deploy site**

### Step 4: Configure Netlify Functions

Create `netlify.toml` in your project root:

```toml
[build]
  command = "bun run build"
  publish = ".next"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

---

## 🚀 Method 3: GitHub Pages + External API

This is **NOT recommended** for your use case, but here's how it would work:

### Step 1: Deploy Frontend to GitHub Pages

```bash
# Install next-export
npm install next-export

# Update next.config.ts for static export
# Change output to "export" instead of "standalone"

# Build static files
bun run build

# Export to out/ directory
bun run export

# Deploy to GitHub Pages using gh-pages
npm install -D gh-pages
gh-pages -d out
```

### Step 2: Deploy API Separately

You would need to deploy your API to:
- Railway (railway.app)
- Render (render.com)
- Fly.io (fly.io)

### Step 3: Update Frontend API Calls

Update `/src/app/page.tsx` to point to your external API:
```typescript
const response = await fetch('https://your-api-domain.com/api/analyze-boxing', {
  // ...
})
```

**This approach is complex and not recommended.** Use Vercel instead!

---

## 🔐 Environment Variables

### For Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# If z-ai-web-dev-sdk requires authentication
ZAI_API_KEY=your_api_key_here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### For Development

Create `.env.local` in your project root:

```env
ZAI_API_KEY=your_api_key_here
```

**⚠️ IMPORTANT**: Never commit `.env.local` to GitHub!

---

## ✅ Post-Deployment Testing

### Test Checklist:

1. ✅ **Basic Functionality**
   - Open your deployed URL
   - See the upload screen
   - UI looks correct

2. ✅ **Video Upload**
   - Upload a small video (< 10MB)
   - See processing animation
   - Get analysis results

3. ✅ **Large File Upload**
   - Upload a video ~50MB
   - Upload a video ~100MB
   - No timeout errors
   - Analysis completes successfully

4. ✅ **Boxing Detection**
   - Upload a boxing video → Shows analysis
   - Upload non-boxing video → Shows "not boxing" message

5. ✅ **Mobile Responsiveness**
   - Test on mobile phone
   - Test on tablet
   - Test on desktop

6. ✅ **Browser Compatibility**
   - Chrome/Edge (Chromium)
   - Safari
   - Firefox

---

## 🔧 Troubleshooting

### Issue 1: 504 Gateway Timeout

**Problem**: Large videos timeout during upload/processing

**Solution**:
```json
// vercel.json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 120  // Increase to 120 seconds
    }
  }
}
```

### Issue 2: File Size Limit Exceeded

**Problem**: "Request entity too large" error

**Solution**:
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '150mb',  // Increase beyond 100MB
    },
  },
}
```

### Issue 3: API Routes Not Working

**Problem**: API returns 404 or errors

**Solution**:
1. Ensure `vercel.json` is in project root
2. Check API routes are in `src/app/api/` directory
3. Verify build logs for errors

### Issue 4: Build Fails

**Problem**: Vercel build fails with errors

**Solution**:
```bash
# Test build locally first
bun run build

# Check for errors and fix them
bun run lint
```

### Issue 5: z-ai-web-dev-sdk Not Working

**Problem**: AI analysis fails

**Solution**:
1. Check environment variables are set in Vercel
2. Verify API key is valid
3. Check Vercel function logs for errors

### Issue 6: Video Uploads Slow

**Problem**: Uploads take too long

**Solution**:
- Add upload progress indicator (already implemented)
- Consider implementing chunked uploads for very large files
- Add resumable upload feature (for production)

---

## 📊 Vercel Free Tier Limits

As of 2024, Vercel free tier includes:
- ✅ 100GB bandwidth per month
- ✅ 6,000 minutes of execution time per month
- ✅ Unlimited team members
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments

**Your boxing app should fit well within these limits!**

---

## 🎯 Production Recommendations

For a production app, consider:

1. **Database** - Add Prisma + PostgreSQL for user accounts
2. **CDN** - Use Cloudflare R2 or AWS S3 for video storage
3. **Analytics** - Add Vercel Analytics or Google Analytics
4. **Error Tracking** - Add Sentry for error monitoring
5. **Rate Limiting** - Prevent API abuse
6. **Caching** - Cache repeated analyses
7. **Email** - Send analysis reports via email

---

## 📞 Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## 🎉 You're Ready to Deploy!

Follow **Method 1 (Vercel)** for the easiest, most reliable deployment.

Your app will be live in under 10 minutes! 🚀

---

**Need help?** Check the Vercel documentation or ask in the Vercel community forums.
