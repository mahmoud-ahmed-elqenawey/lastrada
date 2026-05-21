# La Strada Website

Marketing website for La Strada, a creative and marketing solutions company.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

`pnpm dev` runs a lighter development mode so the laptop stays calmer while editing: the hero uses the poster image instead of autoplay video, and non-essential interaction chrome is disabled.

Use `pnpm dev:full` when you want to review the full cinematic local experience with video, cursor, scroll progress, and production-like motion.

For real performance checks, use:

```bash
pnpm build
pnpm start
```

## Media Hosting

Project media is loaded from Cloudflare R2 through:

```bash
NEXT_PUBLIC_LA_STRADA_MEDIA_BASE_URL=https://pub-9152d84694a54c949533f907a0433921.r2.dev
```

Set the same environment variable in Vercel. Project files can then store media as R2 object paths like `lastrada-media/oliga-rose/videos/file.mp4`.

## Brand Assets

- Optimized web logo: `public/brand/lastrada-logo.png`
- Original high-resolution source: `public/brand/lastrada-logo-source.png`

## Services

- Photography
- Content production
- Motion graphics
- Video editing
- Graphic design
- Social media management
- Web design and development
- Digital marketing
