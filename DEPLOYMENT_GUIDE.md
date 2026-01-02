# 🚀 Deployment Guide - Make Your Portfolio Live

This guide will help you deploy your 3D portfolio to the web. **Vercel is the easiest and recommended option** for Next.js projects.

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- ✅ Your portfolio looks good locally (`npm run dev`)
- ✅ All links and images work
- ✅ Resume PDF is in the `public` folder
- ✅ No console errors

---

## 🎯 Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the best experience.

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: 3D Portfolio"
```

### Step 2: Push to GitHub

1. **Create a GitHub account** (if you don't have one): https://github.com
2. **Create a new repository** on GitHub (don't initialize with README)
3. **Push your code:**

```bash
# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/3d-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** (you can use your GitHub account)
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Click "Deploy"**

**That's it!** Your site will be live in 2-3 minutes at a URL like: `https://your-portfolio.vercel.app`

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `abhiram-anil.com`)
4. Follow DNS configuration instructions

---

## 🌐 Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. **Go to Netlify**: https://netlify.com
2. **Sign up/Login** (use GitHub)
3. **Click "Add new site" → "Import an existing project"**
4. **Select your GitHub repository**
5. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **IMPORTANT**: Add environment variable:
     - Key: `NEXT_PUBLIC_NODE_ENV`
     - Value: `production`
6. **Click "Deploy site"**

---

## ☁️ Option 3: Deploy to AWS/Other Cloud

### Using AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. Connect repository
4. Build settings (auto-detected for Next.js)
5. Deploy

### Using Docker + Any Cloud Provider

1. Create a `Dockerfile` in your project root:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

2. Update `next.config.ts`:

```typescript
const nextConfig = {
  output: 'standalone', // Add this
  // ... rest of config
};
```

---

## 🔧 Important Configuration

### 1. Update Resume Path

Make sure your resume is accessible. Check in `app/page.tsx`:

```typescript
<a href="/resume.pdf" download="Abhiram_Anil_Resume.pdf">
```

Ensure `public/resume.pdf.pdf` is renamed to `public/resume.pdf` or update the link.

### 2. Environment Variables (if needed)

If you add environment variables later:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

### 3. Build Locally First

Test the production build:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` to test.

---

## 🐛 Troubleshooting

### Build Fails

1. **Check for errors:**
   ```bash
   npm run build
   ```

2. **Common issues:**
   - Missing dependencies → `npm install`
   - TypeScript errors → Check `next.config.ts` (errors are ignored)
   - Image optimization → Check `next.config.ts` remote patterns

### Images Not Loading

- Ensure all image URLs in `next.config.ts` are allowed
- Check that external images are accessible
- Use Next.js Image component for optimization

### 3D Spline Scenes Not Loading

- Check Spline scene URLs are correct
- Ensure internet connection (Spline loads from their CDN)
- Check browser console for errors

---

## 📊 Post-Deployment

### 1. Test Everything

- ✅ All pages load
- ✅ Navigation works
- ✅ Projects display correctly
- ✅ Contact form (if integrated)
- ✅ Resume downloads
- ✅ Dark/light mode toggle
- ✅ Mobile responsiveness

### 2. Add Analytics (Optional)

Uncomment in `app/layout.tsx`:

```typescript
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

Get your Google Analytics ID from: https://analytics.google.com

### 3. SEO Optimization

Your portfolio already has:
- ✅ Meta tags
- ✅ Open Graph tags
- ✅ Structured data
- ✅ Sitemap (auto-generated by Next.js)

### 4. Performance

- ✅ Images are optimized
- ✅ Code is minified
- ✅ Spline scenes load asynchronously

---

## 🎉 Quick Start (TL;DR)

**Fastest way to go live:**

1. ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create GitHub repo and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/3d-portfolio.git
   git push -u origin main
   ```

3. Go to https://vercel.com → Import GitHub repo → Deploy

4. **Done!** Your portfolio is live! 🚀

---

## 📝 Next Steps After Deployment

1. **Share your portfolio** on LinkedIn, GitHub, etc.
2. **Update your resume** with the live URL
3. **Monitor analytics** (if added)
4. **Keep updating** with new projects

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **GitHub**: https://github.com

---

**Good luck with your deployment! 🚀**

