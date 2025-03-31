# TriggerMap: A Mental Fitness Log

TriggerMap is a minimal, web-first MVP for logging emotional triggers—your very own mental fitness log. The app guides you through a structured 7-step process to capture the event, emotions, internal narrative, violated core needs, deeper truth, ideal alternative, and action. This approach helps you track your mental fitness, much like a gym log tracks your physical progress.

## Features

- **7-Step Trigger Logging Form:** Capture detailed emotional triggers and reflections.
- **View, Edit & Delete Logs:** Easily manage logs stored in LocalStorage.
- **Export Logs:** Download your logs as a JSON file for backup or analysis.
- **Shared Layout:** Consistent header and navigation across all pages.
- **Fast & Responsive:** Built with React and Vite for speedy development and Hot Module Replacement (HMR).
- **Deployment Ready:** Configured for GitHub Pages deployment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ibexmonj/TriggerMap.git
   cd TriggerMap
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Run the app in development mode with HMR:
```bash
npm run dev
```
The app will be available at [http://localhost:5173/](http://localhost:5173/).  
*Note:* With the production base path configured, you may need to navigate to `http://localhost:5173/TriggerMap/` if testing production settings locally.

### Production Build

To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

### Deployment to GitHub Pages

This project is set up to deploy to GitHub Pages.

1. **Configure Vite:**
   In `vite.config.ts`, ensure the base is set to your repo name:
   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig(({ mode }) => ({
     base: mode === 'production' ? '/TriggerMap/' : '/',
     plugins: [react()],
   }));
   ```
2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```
3. **Update package.json Scripts:**
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. **Deploy:**
   Run:
   ```bash
   npm run deploy
   ```
   This will build your project and push the contents of the `dist` folder to the `gh-pages` branch.
5. **Configure GitHub Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings > Pages**.
   - Under **Source**, select the `gh-pages` branch and click **Save**.
   - Your app will be available at:  
     `https://yourusername.github.io/TriggerMap/`

## Project Structure

```
TriggerMap/
├─ node_modules/
├─ public/
│  └─ (static assets)
├─ src/
│  ├─ components/
│  │  └─ Layout.tsx        # Shared layout with navigation
│  ├─ pages/
│  │  ├─ Home.tsx          # Home page with navigation buttons
│  │  ├─ LogTrigger.tsx    # 7-step form for logging triggers
│  │  ├─ ViewLogs.tsx      # View, edit, delete, and export logs
│  │  └─ EditTrigger.tsx   # Edit a trigger log
│  ├─ App.tsx              # Route definitions using React Router
│  ├─ main.tsx             # Entry point; wraps App in BrowserRouter with basename
│  └─ index.css            # Global styles
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## Technologies Used

- **React** & **TypeScript**
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **LocalStorage** for persisting logs
- **gh-pages** for deployment to GitHub Pages

## Concept: Mental Fitness Log

Think of TriggerMap as a mental fitness log—similar to a gym log, but for your emotional and mental well-being. By tracking your triggers, emotions, and responses over time, you can build self-awareness, foster resilience, and work towards mental fitness.

## Future Enhancements

- **User Authentication:** Support for multiple users.
- **UI Enhancements:** Improved styling using a CSS framework (e.g., Tailwind CSS).
- **Data Visualization:** Analyze your logged triggers and moods over time.
- **Backend Integration:** For persistent storage and advanced analytics.

## License

[MIT](LICENSE)