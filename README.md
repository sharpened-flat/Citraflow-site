# CitraFlow site

Static marketing site for CitraFlow catheter lock products.

The quote request form now includes an OpenAI-backed assistant response that calls the Responses API with the `gpt-5.5` model.

## Files

- `index.html`: main landing page
- `styles.css`: site styling
- `script.js`: small UI interactions
- `404.html`: static not-found page
- `vercel.json`: Vercel deployment config
- `netlify.toml`: Netlify deployment config
- `api/quote-assistant.js`: Vercel serverless endpoint for GPT-5.5 replies
- `netlify/functions/quote-assistant.js`: Netlify serverless endpoint for GPT-5.5 replies
- `lib/openaiQuoteAssistant.js`: shared OpenAI request logic

## Environment

Set `OPENAI_API_KEY` in your deployment platform before using the AI form.

For local development, copy `.env.example` to `.env` and export the variable in the shell that runs your server.

## Deploy

### Vercel

1. Import this folder as a project.
2. Framework preset: `Other`.
3. Root directory: `citraflow-site`.
4. Build command: leave empty.
5. Output directory: leave empty.
6. Add environment variable `OPENAI_API_KEY`.

### Netlify

1. Create a new site from this folder or repo.
2. Base directory: `citraflow-site`.
3. Build command: leave empty.
4. Publish directory: `citraflow-site` if the repo root is above it, otherwise `.`.
5. Add environment variable `OPENAI_API_KEY`.

## Before publishing

- Replace placeholder distributor and sponsor names in `index.html`.
- Add final product images and PDF links.
- Wire the contact form to your preferred backend if you are not using Netlify Forms.
