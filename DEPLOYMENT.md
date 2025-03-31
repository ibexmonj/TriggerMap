# Deployment

This guide explains how to deploy TriggerMap to GitHub Pages.

## 1. Configure Vite

In `vite.config.ts`, ensure the base is set to your repository name for production:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/TriggerMap/' : '/',
  plugins: [react()],
}));
```

## 2. Install gh-pages

Install the gh-pages package as a development dependency:

```bash
npm install --save-dev gh-pages
```

## 3. Update package.json Scripts

Add the following scripts to your `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## 4. Deploy

Run the deploy script:

```bash
npm run deploy
```

This will:
- Build your project into the `dist` folder.
- Push the contents of `dist` to the `gh-pages` branch.

## 5. Configure GitHub Pages

1. Go to your repository on GitHub.
2. Navigate to **Settings > Pages**.
3. Under **Source**, select the `gh-pages` branch and click **Save**.
4. Your app will be available at:
   ```
   https://yourusername.github.io/TriggerMap/
   ```