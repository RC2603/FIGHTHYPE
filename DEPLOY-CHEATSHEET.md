# 🚀 Quick Deployment Cheat Sheet

## ✅ Prerequisites
- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Project ready in `/home/z/my-project`

---

## 📋 5-Minute Deployment Steps

### 1️⃣ Push to GitHub (2 minutes)

```bash
# Go to your project directory
cd /home/z/my-project

# Create GitHub repo at github.com/new
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up/login
2. Click **Add New** → **Project**
3. Click **Import** on your GitHub repo
4. Click **Deploy**
5. Wait ~2 minutes

### 3️⃣ Configure Settings (1 minute)

In Vercel Dashboard → Your Project → **Settings**:

**Functions** → Set **Max Duration**: `60` seconds

That's it! Your app is live! 🎉

---

## 🌐 Your Live URL

After deployment, Vercel will give you:
```
https://your-project-name.vercel.app
```

---

## 🔧 Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `app.yourdomain.com`)
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

---

## 📊 Vercel Free Tier Limits

- ✅ 100GB bandwidth/month
- ✅ 6,000 function execution minutes/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN

**Your boxing app fits perfectly!**

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Run `bun run build` locally first |
| API timeout | Increase Max Duration to 120s |
| File too large | Already configured for 100MB |
| 404 on API | Check `vercel.json` exists |

---

## 📝 Environment Variables

If z-ai-web-dev-sdk requires API key:

**Vercel Dashboard → Settings → Environment Variables**
```
ZAI_API_KEY=your_key_here
```

---

## 🔄 Updating Your App

```bash
# Make changes locally
git add -A
git commit -m "Your changes"
git push

# Vercel auto-deploys! ✨
```

---

## 📚 Full Documentation

- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
- See [README.md](./README.md) for app documentation

---

**Need help?** Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)

---

**⏱️ Total time: ~5 minutes**
**💰 Cost: Free** (Vercel free tier)
**🎯 Difficulty: Easy** (zero config!)
