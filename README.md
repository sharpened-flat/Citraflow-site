# CitraFlow site

Static marketing site for CitraFlow catheter lock products.

## Files

- `index.html`: main landing page
- `styles.css`: site styling
- `script.js`: small UI interactions
- `404.html`: static not-found page
- `vercel.json`: Vercel deployment config
- `netlify.toml`: Netlify deployment config

## Deploy

### Vercel

1. Import this folder as a project.
2. Framework preset: `Other`.
3. Root directory: `citraflow-site`.
4. Build command: leave empty.
5. Output directory: leave empty.

### Netlify

1. Create a new site from this folder or repo.
2. Base directory: `citraflow-site`.
3. Build command: leave empty.
4. Publish directory: `citraflow-site` if the repo root is above it, otherwise `.`.

## Before publishing

- Replace placeholder distributor and sponsor names in `index.html`.
- Add final product images and PDF links.
- Wire the contact form to your preferred backend if you are not using Netlify Forms.
