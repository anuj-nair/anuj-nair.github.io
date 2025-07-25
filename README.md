# 🚀 Anuj Nair - React Portfolio

A modern, responsive portfolio website showcasing expertise in Python, Machine Learning, LLMs, Automation, and Cloud technologies. Built with React 18, TypeScript, and Bootstrap 5, featuring smooth animations, interactive timelines, and real-time API integrations.

## ✨ Latest Features & Improvements

### 🎨 **Enhanced Design & UX**
- **Circular Profile Picture** - Modern circular design with enhanced hover effects
- **Optimized Title Spacing** - About section title positioned closer to content
- **Smooth Animations** - Enhanced show/hide animations with multi-stage transitions
- **Mobile Timeline** - Left-aligned timeline with overlapping year badges for better mobile UX
- **Professional Layout** - Improved spacing and visual hierarchy throughout

### 📱 **Mobile-First Optimization**
- **Responsive Timeline** - Mobile timeline with line on left and overlapping badges
- **Enhanced Card Width** - Experience cards use 95%+ of screen width on mobile
- **Touch-Friendly** - Optimized interactions for mobile devices
- **Single-Line Dates** - Year badges display month-year format on one line
- **Improved Navigation** - Mobile-optimized navigation with smooth scrolling

### 🔧 **Technical Excellence**
- **React 18 + TypeScript** - Modern architecture with full type safety
- **Advanced State Management** - Enhanced animation states for smooth transitions
- **Performance Optimized** - Lazy loading, code splitting, and optimized bundles
- **SPA Routing** - Proper single-page application routing support
- **GitHub Pages Ready** - Automated deployment with GitHub Actions

### 📊 **Interactive Features**
- **Live Stats Integration** - Real-time GitHub repositories and LeetCode problems solved
- **Expandable Timeline** - Smooth show more/less functionality with enhanced animations
- **Project Showcase** - Video previews with GitHub and demo links
- **Skills Filtering** - Interactive skill categories with smooth transitions
- **Tech Badge Interactions** - Expandable technology lists with show more/less

### 🚀 **Deployment & DevOps**
- **Automated Deployment** - GitHub Actions workflow for continuous deployment
- **Manual Deployment** - Alternative deployment script for manual control
- **Environment Configuration** - Easy setup with environment variables
- **Build Optimization** - Optimized production builds with performance monitoring

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Bootstrap 5
- **Styling:** CSS3 with custom animations, responsive design, and mobile optimization
- **APIs:** GitHub API, LeetCode Stats API, Axios for HTTP requests
- **Deployment:** GitHub Pages, GitHub Actions CI/CD
- **Tools:** ESLint, npm, Git, VS Code

## 🚀 Live Demo

**Website:** [https://anuj-nair.github.io](https://anuj-nair.github.io)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/anuj-nair/anuj-nair.github.io.git
cd anuj-nair.github.io
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment (optional)**
```bash
cp .env.example .env
# Edit .env with your API credentials if needed
```

4. **Start development server**
```bash
npm start
```

5. **Open browser**
- Navigate to `http://localhost:3000`

### Deployment

**Automatic Deployment (Recommended):**
```bash
git add .
git commit -m "Your changes"
git push origin main
# GitHub Actions will automatically deploy
```

**Manual Deployment:**
```bash
npm run deploy
# or use the deployment script
./deploy.sh
```

## 📁 Project Structure

```
anuj-nair.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── public/
│   ├── assets/
│   │   ├── icons/                  # Technology and social icons
│   │   ├── imgs/                   # Profile pictures and images
│   │   ├── projects/               # Project demo videos
│   │   └── resume/                 # CV/Resume PDF
│   ├── 404.html                    # SPA routing support
│   ├── index.html                  # Main HTML template
│   └── manifest.json               # PWA manifest
├── src/
│   ├── components/
│   │   ├── About.tsx               # About section with circular profile
│   │   ├── Contact.tsx             # Contact form and social links
│   │   ├── Experience.tsx          # Interactive timeline with animations
│   │   ├── Hero.tsx                # Hero/intro section
│   │   ├── Navbar.tsx              # Navigation with scroll spy
│   │   ├── Projects.tsx            # Project showcase with videos
│   │   └── Skills.tsx              # Skills with filtering
│   ├── hooks/
│   │   └── useScrollAnimation.tsx  # Custom scroll animation hook
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Global styles and animations
│   ├── index.tsx                   # Application entry point
│   └── index.css                   # Base styles
├── old-website-backup/             # Backup of previous static site
├── build/                          # Production build (generated)
├── deploy.sh                       # Manual deployment script
├── DEPLOYMENT.md                   # Deployment documentation
├── MIGRATION_COMPLETE.md           # Migration summary
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 🎯 Components Overview

### **Hero Section**
- Dynamic introduction with animated typing effect
- Professional title and description
- Call-to-action buttons for resume and contact
- Responsive design with mobile optimization

### **About Section**
- **Circular profile picture** with enhanced hover effects
- **Closer title spacing** for better visual hierarchy
- Live GitHub repositories and LeetCode problems solved
- Professional bio with download resume functionality

### **Experience Section**
- **Interactive timeline** with left-aligned design on mobile
- **Overlapping year badges** for better space utilization
- **Enhanced animations** for show more/less functionality
- **Expandable content** with smooth multi-stage transitions
- **Technology badges** with expandable lists
- Real work experience from StikkmanUX, Infineon, and Keemut

### **Projects Section**
- **Video previews** for project demonstrations
- **Interactive cards** with GitHub and demo links
- **Project filtering** and categorization
- Real projects including MNIST classifier, AI Snake game, A* Algorithm

### **Skills Section**
- **Categorized skill sets** with interactive filtering
- **Technology icons** with professional styling
- **Responsive grid** layout for all devices
- Skills organized by Frontend, Backend, AI/ML, and Tools

### **Contact Section**
- **Direct contact form** with validation
- **Social media integration** with professional links
- **Responsive design** with mobile optimization
- **Email functionality** for direct communication

## 🔧 Customization

### **Personal Information**
All components are fully customized with real information:
- **About.tsx** - Professional bio, circular profile picture, live GitHub/LeetCode stats
- **Experience.tsx** - Real work experience with interactive timeline and animations
- **Projects.tsx** - Actual projects with video demos and live links
- **Contact.tsx** - Professional contact information and social links
- **Skills.tsx** - Real technical skills with categorized filtering
- **Hero.tsx** - Professional introduction and call-to-action

### **Styling & Theming**
- **App.css** - Global styles, animations, and responsive design
- **CSS Variables** - Easy color scheme customization in `:root`
- **Mobile Optimization** - Responsive breakpoints and mobile-first design
- **Animation System** - Smooth transitions and scroll animations

### **Environment Configuration**
```env
# Optional API configurations
REACT_APP_GITHUB_USERNAME=anuj-nair
REACT_APP_LEETCODE_USERNAME=anuj-nair
REACT_APP_EMAIL=your-email@example.com
```

## 🚀 Deployment Options

### **Automatic Deployment (GitHub Actions)**
- **Trigger:** Push to main branch
- **Process:** Automatic build and deployment
- **Configuration:** `.github/workflows/deploy.yml`
- **Live URL:** https://anuj-nair.github.io

### **Manual Deployment**
```bash
# Using npm script
npm run deploy

# Using deployment script
./deploy.sh

# Manual build and deploy
npm run build
npx gh-pages -d build
```

### **Alternative Platforms**
- **Netlify:** Connect repository, set build command to `npm run build`
- **Vercel:** Import repository, automatic configuration
- **Firebase Hosting:** Use `firebase deploy` after setup

## 🔧 Available Scripts

```bash
# Development
npm start              # Start development server (http://localhost:3000)
npm run build          # Build optimized production bundle
npm test               # Run test suite
npm run lint           # Check code quality with ESLint
npm run lint:fix       # Automatically fix ESLint issues

# Deployment
npm run deploy         # Deploy to GitHub Pages
./deploy.sh           # Run deployment script with status updates
```

## 🌟 Performance & Optimization

### **Build Optimization**
- **Bundle Size:** Optimized with code splitting and tree shaking
- **Asset Optimization:** Compressed images and lazy loading
- **CSS Optimization:** Minified styles with critical CSS inlining
- **JavaScript:** Minified and optimized for production

### **Runtime Performance**
- **Smooth Animations:** Hardware-accelerated CSS animations
- **Efficient Rendering:** Optimized React hooks and state management
- **Mobile Performance:** Touch-optimized interactions and responsive design
- **Loading Speed:** Fast initial load with progressive enhancement

### **SEO & Accessibility**
- **Meta Tags:** Comprehensive SEO optimization
- **Semantic HTML:** Proper heading hierarchy and ARIA labels
- **Mobile-First:** Responsive design with mobile optimization
- **Performance Score:** 95+ Lighthouse score across all metrics

## 📱 Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers:** iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement:** Graceful degradation for older browsers
- **Responsive Design:** Optimized for all screen sizes and devices

## 🔒 Security & Best Practices

- **Type Safety:** Full TypeScript implementation
- **Input Validation:** Form validation and sanitization
- **Environment Variables:** Secure configuration management
- **HTTPS Ready:** Production-ready security headers
- **XSS Protection:** React's built-in sanitization

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request with detailed description

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** - For the incredible framework and ecosystem
- **TypeScript Team** - For type safety and developer experience
- **Bootstrap Team** - For responsive design components
- **GitHub** - For hosting and GitHub Actions CI/CD
- **Open Source Community** - For the amazing tools and libraries

## 📞 Contact & Support

**Anuj Nair**
- 🌐 **Website:** [https://anuj-nair.github.io](https://anuj-nair.github.io)
- 💼 **LinkedIn:** [linkedin.com/in/anuj-nair](https://linkedin.com/in/anuj-nair)
- 🐙 **GitHub:** [github.com/anuj-nair](https://github.com/anuj-nair)
- 📧 **Email:** anujnair.dev@gmail.com

For technical support:
- 🐛 **Issues:** [GitHub Issues](https://github.com/anuj-nair/anuj-nair.github.io/issues)
- 📖 **Documentation:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

⭐ **Star this repository if you found it helpful!**

**Built with ❤️ and modern web technologies**
