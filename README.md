# Ho Chi Minh Photo Gallery

This project now uses a static-export + client-side data model so it can be deployed to Cloudflare Pages.

## Architecture

- Next.js static export (output in out/)
- Client-side photo loading from public/photos-manifest.json
- Build-time manifest generation from Cloudinary (scripts/generate-photos-manifest.mjs)

At runtime, Cloudflare only serves static files. No Next.js server is required.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build static output:

```bash
npm run build
```

## Required environment variables

Set these in your local .env.local and in Cloudflare Pages project settings:

- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_FOLDER

Notes:

- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is public and used in browser image URLs.
- CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET / CLOUDINARY_FOLDER are used only at build time to generate public/photos-manifest.json.

If build-time Cloudinary env vars are missing, the prebuild script writes an empty manifest.

## Cloudflare Pages deployment

Use these settings in Cloudflare Pages:

- Framework preset: Next.js (or None)
- Build command: npm run build
- Build output directory: out
- Node.js version: 20+

Because this project exports static files, Cloudflare Pages can serve it directly from out/.
