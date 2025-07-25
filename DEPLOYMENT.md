# 🚀 React Portfolio Deployment Guide

This guide provides comprehensive instructions for deploying your React portfolio to GitHub Pages.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- GitHub account

## 🛠️ Setup Instructions

### 1. Repository Configuration

Your repository is already configured with:
- ✅ `homepage` field in `package.json` pointing to your GitHub Pages URL
- ✅ `gh-pages` package for deployment
- ✅ GitHub Actions workflow for automatic deployment

### 2. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test the build locally
npx serve -s build
```

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys your site when you push to the main branch.

**How it works:**
1. Push changes to `main` or `master` branch
2. GitHub Actions automatically builds and deploys
3. Site is live at `https://anuj-nair.github.io`

**Workflow file:** `.github/workflows/deploy.yml`

### Method 2: Manual Deployment

```bash
# Deploy manually using gh-pages
npm run deploy
```

This command:
1. Builds the React app (`npm run build`)
2. Deploys the build folder to `gh-pages` branch
3. GitHub Pages serves from the `gh-pages` branch

## ⚙️ GitHub Pages Configuration

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Update the `homepage` field in `package.json`

## 📁 Project Structure

```
anuj-nair.github.io/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── public/
│   ├── assets/            # Static assets
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── App.tsx           # Main app component
│   └── index.tsx         # Entry point
├── old-website-backup/    # Backup of previous site
├── package.json          # Dependencies and scripts
└── DEPLOYMENT.md         # This file
```

## 🔧 Environment Variables

Create a `.env` file for local development:

```env
# Copy from .env.example
REACT_APP_GITHUB_USERNAME=anuj-nair
REACT_APP_LEETCODE_USERNAME=anuj-nair
REACT_APP_EMAIL=your-email@example.com
```

**Note:** Environment variables for production should be set in GitHub repository settings under **Settings** → **Secrets and variables** → **Actions**.

## 🐛 Troubleshooting

### Common Issues

1. **404 Error on Refresh**
   - GitHub Pages doesn't support client-side routing by default
   - Solution: Add a `404.html` file that redirects to `index.html`

2. **Assets Not Loading**
   - Check the `homepage` field in `package.json`
   - Ensure all asset paths are relative

3. **Build Fails**
   - Check for TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed: `npm install`

4. **Deployment Fails**
   - Check GitHub Actions logs in the **Actions** tab
   - Verify repository permissions for GitHub Actions

### Debug Commands

```bash
# Check for TypeScript errors
npm run lint

# Fix linting issues
npm run lint:fix

# Test build locally
npm run build && npx serve -s build

# Check package versions
npm list
```

## 📊 Performance Optimization

The site includes several optimizations:
- ✅ Code splitting with React.lazy()
- ✅ Image optimization and lazy loading
- ✅ CSS minification
- ✅ Bundle analysis available with `npm run build`

## 🔄 Updating the Site

1. Make changes to your React components
2. Test locally with `npm start`
3. Commit and push to main branch
4. GitHub Actions will automatically deploy

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review this documentation
3. Check the React and GitHub Pages documentation
4. Open an issue in the repository

---

**Live Site:** https://anuj-nair.github.io
**Repository:** https://github.com/anuj-nair/anuj-nair.github.io
