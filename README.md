# KY-131 Announcements React App

## Development

- Main entry: `src/index.tsx` (calls `main.tsx` for compatibility, but `index.tsx` is the true entry point)
- To start locally: `npm start`
- To build: `npm run build`
- To deploy to GitHub Pages: `npm run deploy`

## Deployment Notes
- The build system (Create React App or Vite) uses `src/index.tsx` as the entry point by default.
- `public/index.html` is the HTML template; the app mounts to the `#root` div.
- Ensure your `package.json` has the correct `homepage` and deploy scripts.

## Troubleshooting
- If you want to use `main.tsx` as the entry, rename it to `index.tsx` or update your build tool config.
- By default, React expects `src/index.tsx` as the entry file.
