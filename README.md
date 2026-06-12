# Sketch Web Tech - Corporate PWA Website

Welcome to the repository for **Sketch Web Tech**, an agile IT consulting and custom software development firm. Our tagline is **"Crafting Intelligent Digital Experiences"**. 

This application is built as a high-performance Progressive Web Application (PWA) with a premium, futuristic dark-mode design featuring neon glassmorphism accents and smooth scrolling animations.

---

## 🌟 Key Features

*   **Progressive Web App (PWA) Support:**
    *   Fully installable on desktop and mobile platforms.
    *   Offline resilience with native Service Worker cache-first static assets routing (`public/sw.js`).
    *   Standalone app layout configuration (`public/manifest.json`).
*   **Modern Design & Motion Effects:**
    *   Curated slate-dark background with vibrant cyan/purple neon highlights.
    *   Glassmorphic panels with radial cursor spotlight hover effects (`.spotlight-card`).
    *   Parallax technology background section on the Home page.
    *   Dynamic stats metrics counter (Years of Exp, Clients, PWAs) on the About page.
    *   Interactive vertical company evolution timeline highlighting milestones from **2012** to the present.
*   **Privacy-First Form Mail Routing:**
    *   All web client communication is routed directly via AJAX to the administrative email inbox.
    *   **Anti-Scraper Obfuscation:** The recipient email is Base64 obfuscated (`Y3ByYWthc2h3ZWJAZ21haWwuY29t`) inside the code to protect against automated spambots, while the public UI continues to present the official business address `info@sketchwebtech.com`.
    *   Submit buttons display inline loading states (`.btn-spinner`) and disable interactions to prevent double-submissions.
*   **Automated SEO Management:**
    *   A stateful react hook updates document `<title>` tags and `<meta name="description">` content dynamically depending on the selected tab (Home, Services, About, Contact).

---

## 🛠️ Technology Stack

*   **Core UI Library:** [React 19](https://react.dev/)
*   **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Bundler & Dev Server:** [Vite 8](https://vite.dev/)
*   **Icon Suite:** [Lucide React](https://lucide.dev/)
*   **Styling:** Custom vanilla CSS (`src/index.css`) containing variables, keyframe animations, and media queries.

---

## 📁 Project Structure

```text
├── public/
│   ├── favicon.svg          # SVG Icon logo
│   ├── icon-192.png         # PWA Manifest Icon
│   ├── icon-512.png         # PWA Splash Screen Icon
│   ├── manifest.json        # Web App Manifest config
│   ├── sw.js                # Offline Service Worker cache implementation
│   └── parallax-bg.png      # Parallax circuit background image
├── src/
│   ├── assets/              # Static logo SVGs & images
│   ├── components/
│   │   ├── Header.tsx       # Navbar with SVG animated corporate logo
│   │   └── Footer.tsx       # Footer links and PWA install trigger buttons
│   ├── pages/
│   │   ├── Home.tsx         # Hero typewriter, canvas particle network, and customer feedback
│   │   ├── About.tsx        # Counter stats and realigned corporate evolution timeline
│   │   ├── Services.tsx     # Services board focusing on AI and SAP ERP integrations
│   │   └── Contact.tsx      # Contact form integrated with FormSubmit.co
│   ├── App.tsx              # Main routing, sticky social bars, and callback drawer form
│   ├── index.css            # Core design system and CSS components
│   └── main.tsx             # Application entry point & PWA registration
├── package.json             # Scripts and dependencies
└── vite.config.ts           # Vite compilation settings
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your computer.

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### Installation

Clone the repository and install the npm dependencies:

```bash
# Clone the repository
git clone https://github.com/cprakashweb/swt.git

# Navigate into the project folder
cd skt-web

# Install dependencies
npm install
```

### Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the local hot-reloading Vite development server on `http://localhost:5173/` |
| `npm run build` | Compiles the TypeScript code and bundles optimized static assets into the `dist/` directory |
| `npm run preview` | Serves the compiled production bundle locally to preview before deployment |

---

## 📨 Form Integration Details (FormSubmit.co)

The website forms submit details to the FormSubmit.co AJAX gateway.

1.  **Activation:** The very first time you submit the **Contact Form** or **Callback Request Form**, FormSubmit will send a verification email to `cprakashweb@gmail.com`. You must open this email and click the confirmation link to activate the endpoint.
2.  **Privacy Token/Hash:** To hide the email endpoint completely from browser Developer Tools (Network inspection tab), you can get a random hash string from FormSubmit upon activation. You can then replace the base64-decoded email string in `App.tsx` and `Contact.tsx` with that hash endpoint token:
    *   *Example endpoint:* `https://formsubmit.co/ajax/your-random-hash-token`

---

## ☁️ Deployment Guide (Azure Static Web Apps)

Since Vite compiles the application into pure, static files, it is perfectly suited for hosting on **Azure Static Web Apps** (free, fast, and integrates natively with GitHub Actions).

1.  Generate a production build:
    ```bash
    npm run build
    ```
2.  Log in to the [Azure Portal](https://portal.azure.com/).
3.  Search for **Static Web Apps** and click **Create**.
4.  Link your GitHub account, select `cprakashweb/swt` repository, and pick the `main` or `develop` branch.
5.  Set the build details:
    *   **Build Preset:** `Vite`
    *   **App Location:** `/` (or `./`)
    *   **Api Location:** *Leave blank*
    *   **Output Location:** `dist`
6.  Click **Review + Create**. Azure will set up a GitHub Actions workflow file in your repository and deploy the website automatically on every future commit!

---

## 📞 Business Channels

*   **Location:** C-042C 4th Floor Supermart, DLF Phase -IV, Gurugram, HR - 122009
*   **Professional Inquiry Email:** info@sketchwebtech.com
*   **WhatsApp Direct Link:** [+91 83969 14656](https://wa.me/918396914656)
