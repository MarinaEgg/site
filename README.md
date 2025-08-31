## 🔧 Key Integrations

### AI & ML Services
- **RAG (Retrieval-Augmented Generation)** systems
- **iManage** document management integration
- **Jina AI** connector for advanced processing

### Communication & CRM
- **Gmail SMTP** for automated email workflows
- **Contact form** with validation and confirmation
- **Quote request system** with lead capture
- **Email templates** with responsive HTML design# EggOn Technology Website

[![Website Status](https://img.shields.io/website-up-down-green-red/https/eggon-technology.com.svg)](https://eggon-technology.com)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](./LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/eggon-technology/website/graphs/commit-activity)

## 👋 Welcome

Hello! I'm **Marina**, and I developed this website in collaboration with **Claude 4 Sonnet**. We chose to build upon an existing React project to leverage pre-configured dependencies and streamline our development process. While we're using React 16.13.1 (an earlier version), this foundation allowed us to focus on creating innovative AI solutions rather than reinventing the wheel.

---

## 🚀 About EggOn Technology

EggOn Technology develops **contextual AI agents based on RAG (Retrieval-Augmented Generation)**, capable of connecting to various data sources and executing complex tasks. We integrate a proprietary **traceability and governance system**, providing clients with clear explanations of AI actions through QR codes. Our mission is to make AI agents **transparent and insurable**.

### 🎯 Our Vision
Making AI agents trustworthy through **Explainable AI Governance** - ensuring every AI decision can be traced, understood, and assured.

## ✨ Core Features

### 🤖 NOG Project (Nested Orchestration & Governance)
Advanced **AI agent orchestration** system that coordinates multiple specialized agents while maintaining full traceability and governance.

### 📚 AI Agent Collection
Specialized AI agents for various industries:
- **Contract Analysis** - Automated legal document review
- **Due Diligence** - Comprehensive business analysis
- **Document Generation** - Intelligent content creation
- **Compliance Monitoring** - Regulatory adherence tracking

### ⚖️ Legal Stack
Comprehensive legal technology suite:
- **Multilingual RAG tools** - Advanced retrieval systems
- **Structured legal prompts** - Domain-specific AI interactions  
- **iManage/Jina AI connectors** - Enterprise integrations
- **Regulatory compliance** - Built-in legal frameworks

### 🔍 Traceability & Governance
Proprietary system providing:
- **QR Code explanations** - Instant AI decision transparency
- **Full action tracking** - Complete audit trails
- **Compliance assurance** - Regulatory confidence
- **Agent chain governance** - End-to-end oversight

## 🛠️ Technical Stack

- **Frontend Framework**: React 16.13.1 with Material-UI
- **Animations**: Framer Motion, React Transition Group  
- **3D Graphics**: Three.js for interactive visualizations
- **Email System**: Nodemailer with Gmail integration
- **Internationalization**: i18next for **trilingual support** (English/French/Spanish)
- **SEO Optimization**: Google Search Console verified with comprehensive SEO strategy
- **Sitemap Integration**: Automated sitemap generation for search engine indexing
- **Routing**: React Router DOM
- **State Management**: React Hooks + Context
- **Build Tools**: Create React App with react-snapshot
- **Deployment**: Vercel with optimized builds

## 📁 Project Structure

```
├── .github/                    # GitHub configuration
│   └── FUNDING.yml            # Funding and sponsorship info
├── api/                       # Serverless API endpoints
│   ├── email-config.js        # Email service configuration with Gmail SMTP
│   └── quote.js              # Quote request handler with dual email workflow
├── public/                    # Static assets and SEO files
│   ├── *.webp, *.png         # Optimized images and favicons
│   ├── index.html            # SEO-optimized HTML with structured data
│   ├── robots.txt            # Search engine crawler instructions
│   ├── sitemap.xml           # Complete site structure for indexing
│   ├── manifest.json         # PWA configuration
│   └── googleb274965fd2737434.html # Google Search Console verification
├── src/
│   ├── app/                  # Core application setup
│   │   ├── App.js           # Main application component
│   │   └── HelmetMeta.js    # Dynamic SEO meta management
│   ├── components/          # Reusable UI components
│   │   ├── collection/      # AI Agent showcase with quote forms
│   │   ├── content/         # Homepage content sections
│   │   ├── footer/          # Site footer with links
│   │   ├── header/          # Navigation with language selector
│   │   ├── learn/           # Training section components
│   │   ├── legalStack/      # Legal technology showcase
│   │   ├── nog/             # NOG Project presentation
│   │   ├── noglab/          # R&D laboratory section
│   │   ├── navigation/      # SEO-optimized navigation components
│   │   ├── parallax/        # Smooth scrolling effects
│   │   ├── theme/           # Dark/light mode management
│   │   └── why-eggon/       # Company mission section
│   ├── hooks/               # Custom React hooks
│   │   ├── useInViewport.js # Intersection observer hook
│   │   └── usePrefersReducedMotion.js # Accessibility hook
│   ├── i18n/                # Internationalization setup
│   │   ├── locales/         # Translation files (en, fr, es)
│   │   └── i18n.js          # i18next configuration
│   ├── pages/               # Route components
│   │   ├── Home.js          # Landing page with all sections
│   │   ├── Contact.js       # Contact form with email integration
│   │   ├── Learn.js         # AI training and education page
│   │   ├── NOGLab.js        # Innovation laboratory showcase
│   │   └── PageNotFound.js  # 404 error page
│   ├── settings/            # Application configuration
│   │   └── settings.json    # Global app settings
│   ├── utils/               # Utility functions
│   │   ├── logCredits.js    # Development credits
│   │   ├── style.js         # CSS utilities
│   │   ├── three.js         # 3D graphics utilities
│   │   └── transition.js    # Page transition effects
│   ├── index.css            # Global styles and CSS variables
│   └── index.js             # Application entry point
├── .env                     # Environment variables (Gmail SMTP, etc.)
├── .gitignore              # Git ignore patterns
├── LICENSE                 # Proprietary license
├── README.md               # This file
├── package.json            # Dependencies and scripts
├── test-gmail-quick.js     # Email testing utility
└── vercel.json             # Vercel deployment configuration
```

## 🚦 Development Setup

### Prerequisites
- Node.js 14+
- npm or yarn
- Git access to private repository

### Installation
```bash
# Clone the repository (private access required)
git clone https://github.com/MarinaEgg/site.git
cd eggon-website-react

# Install dependencies
npm install
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=eggoncontact@gmail.com
SMTP_PASS=your-gmail-app-password

# Display Email Settings
FROM_EMAIL=contact@eggon-technology.com
FROM_NAME=EggOn Technology

# Internal Notifications
INTERNAL_EMAIL=m.jacquet@eggon.fr

# Environment
NODE_ENV=development
```

> **⚠️ Security Note**: Use Gmail App Passwords, not your regular password. Enable 2FA on your Gmail account first.

# Development Scripts

```bash
# Development server
npm start                # Starts dev server on http://localhost:3000
npm run dev             # Same as npm start

# Production build
npm run build           # Creates optimized build with react-snapshot

# Testing
npm test                # Runs test suite
npm run test-email      # Tests Gmail SMTP configuration

# Utilities
npm run eject           # Ejects from Create React App (irreversible)
```

### 📧 Automated Quote System
Advanced quote request system integrated into the AI agent collection:
- **Direct quote requests** from agent cards with custom requirements
- **Dual email workflow**: Client confirmations + internal team notifications
- **Professional email templates** with branded HTML design
- **48-hour response commitment** automatically communicated
- **CRM integration ready** for lead management

#### Quote Process Flow
1. **Client interaction**: User fills requirements on agent collection cards
2. **Automatic emails**: 
   - Client receives branded confirmation with request summary
   - Internal team gets detailed notification at `eggoncontact@gmail.com`
3. **Professional follow-up**: 48-hour response guarantee with personalized quotes

## 🌐 SEO & Performance Optimization

### Search Engine Optimization
- **Google Search Console verified** with full indexing
- **Comprehensive sitemap** with automated updates
- **Structured data implementation** with Schema.org markup
- **Multilingual SEO** with hreflang tags for 3 languages
- **Page-specific indexing** with optimized meta tags
- **Rich snippets** for enhanced search results
- **Core Web Vitals optimization** for Google ranking

### Performance Features
- **React Snapshot** for static pre-rendering and SEO
- **Lazy loading** for images and components  
- **Code splitting** for faster initial load
- **CDN optimization** via Vercel Edge Network
- **Progressive Web App** capabilities
- **Critical CSS inlining** for faster rendering

### Internationalization (i18n)
- **3 Languages**: English (primary), French, Spanish
- **Dynamic language detection** based on browser preferences
- **SEO-friendly URLs** with language prefixes
- **Translated meta tags** and structured data
- **Cultural adaptation** for different markets

## 🚀 Deployment & Infrastructure

### Vercel Deployment
- **Automatic deployments** from main branch (`https://github.com/MarinaEgg/site.git`)
- **Environment variable management** with secure credential storage
- **Edge network optimization** for global performance
- **Custom domain** configuration (`eggon-technology.com`)
- **SSL/HTTPS** with automatic certificate management

### Build Pipeline
- **React Snapshot** integration for static pre-rendering
- **Asset optimization** and compression
- **Source map generation** for debugging
- **Bundle analysis** and performance monitoring

### AI & ML Services
- **RAG (Retrieval-Augmented Generation)** systems
- **iManage** document management integration
- **Jina AI** connector for advanced processing

## 📊 Business Features

### Lead Generation
- **Interactive agent collection** with direct quote requests
- **Custom requirement forms** for each AI agent
- **Automated lead qualification** and routing
- **Professional email workflows** maintaining brand consistency

### Client Experience
- **48-hour response guarantee** for all quote requests
- **Multilingual support** (EN/FR/ES) for global reach
- **Mobile-optimized interface** for all device types
- **Accessible design** following WCAG guidelines

## 📄 License

This project is the exclusive property of **EggOn Technology**. All rights reserved.  
See the [LICENSE](./LICENSE) file for complete terms and conditions.

## 🤝 Contact & Support

- **Website**: [eggon-technology.com](https://eggon-technology.com)
- **Primary Email**: eggoncontact@gmail.com  
- **Business Inquiries**: contact@eggon-technology.com
- **Repository**: [GitHub - MarinaEgg/site](https://github.com/MarinaEgg/site.git)

### Support Channels
- **Quote Requests**: Automatic processing via website forms
- **Technical Support**: Direct email to development team
- **Business Development**: Professional consultation available

## 🚀 What's Next

### Upcoming Features
- **Enhanced QR code traceability interface** for AI decision transparency
- **Extended AI agent marketplace** with industry-specific solutions  
- **Advanced governance dashboards** for enterprise clients
- **API documentation portal** for developer integrations
- **Mobile app version** for iOS and Android

### Roadmap
- **Q2 2025**: Advanced AI Academy subscription
- **Q3 2025**: Updated short product videos
- **Q4 2025**: Website split — Home → Product, separating RAG, Agent Collection, and Traceability Orchestrator

---

*Built with ❤️ by the EggOn Technology team - Making AI Transparent & Trustworthy*
