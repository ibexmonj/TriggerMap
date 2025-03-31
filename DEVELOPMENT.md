# Development

This guide will help you get started with developing and contributing to TriggerMap.

## Running the App Locally

To run the app in development mode with Hot Module Replacement (HMR):

```bash
npm run dev
```

## Project Structure Overview

```
TriggerMap/
├─ public/               # Static assets
├─ src/
│  ├─ components/        # Shared components (e.g., Layout)
│  ├─ pages/             # Page components (Home, LogTrigger, ViewLogs, EditTrigger)
│  ├─ App.tsx            # Route definitions (React Router)
│  ├─ main.tsx           # Entry point; wraps App in BrowserRouter with basename
│  └─ index.css          # Global styles
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## Making Changes

- **Components & Pages**  
  Create or modify components in the `src/components` or `src/pages` directories.

- **Routing**  
  Adjust `App.tsx` to add or remove routes as needed.

- **Styling**  
  Update `index.css` for global styles, or add separate CSS/SCSS files.

## Testing Production Build Locally

Create a production build and preview it:
```bash
npm run build
npm run preview
```
Then open [http://localhost:4173/](http://localhost:4173/) to see the production version.