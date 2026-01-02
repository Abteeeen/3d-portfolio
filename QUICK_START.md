# ⚡ Quick Start - Deploy in 5 Minutes

## 🚀 Fastest Way to Go Live

### Step 1: Initialize Git (2 minutes)

Open your terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: 3D Portfolio"
```

### Step 2: Push to GitHub (3 minutes)

1. **Create a GitHub account** (if needed): https://github.com/signup
2. **Create a new repository:**
   - Go to https://github.com/new
   - Name it: `3d-portfolio` (or any name you like)
   - **Don't** check "Initialize with README"
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/3d-portfolio.git
   git branch -M main
   git push -u origin main
   ```
   *(Replace `YOUR_USERNAME` with your GitHub username)*

### Step 3: Deploy to Vercel (2 minutes)

1. **Go to**: https://vercel.com
2. **Sign up** (use "Continue with GitHub")
3. **Click "Add New Project"**
4. **Import your repository** (select `3d-portfolio`)
5. **Click "Deploy"** (no configuration needed!)

**Done!** 🎉 Your portfolio is live at: `https://your-portfolio.vercel.app`

---

## ✅ Pre-Deployment Check

Before deploying, test locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` to make sure everything works.

---

## 🔧 Fix Resume Download

Your resume file is `resume.pdf.pdf`. Either:

**Option A:** Rename the file:
```bash
# In public folder, rename:
resume.pdf.pdf → resume.pdf
```

**Option B:** Keep it as is (already fixed in code)

---

## 📝 What Happens After Deployment?

1. **Get your live URL** (e.g., `https://3d-portfolio.vercel.app`)
2. **Test everything:**
   - ✅ All pages load
   - ✅ Navigation works
   - ✅ Projects display
   - ✅ Resume downloads
   - ✅ Dark/light mode works
   - ✅ Mobile view works

3. **Share your portfolio:**
   - Add to LinkedIn
   - Add to GitHub profile
   - Add to resume
   - Share with employers!

---

## 🆘 Troubleshooting

**Build fails?**
- Run `npm run build` locally to see errors
- Make sure all dependencies are installed: `npm install`

**Images not loading?**
- Check `next.config.ts` has correct remote patterns
- Ensure external URLs are accessible

**3D scenes not showing?**
- Spline scenes load from their CDN (needs internet)
- Check browser console for errors

---

## 🎯 Next Steps

1. **Custom Domain** (optional):
   - In Vercel → Settings → Domains
   - Add your domain (e.g., `abhiram-anil.com`)

2. **Add Analytics** (optional):
   - Uncomment Google Analytics in `app/layout.tsx`
   - Add your GA tracking ID

3. **Keep updating:**
   - Add new projects
   - Update experience
   - Improve content

---

**Need more details?** See `DEPLOYMENT_GUIDE.md` for comprehensive instructions.

**Good luck! 🚀**

