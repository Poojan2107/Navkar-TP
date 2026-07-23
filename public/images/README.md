# Media assets

## In use

Real photos live in `public/images/navkar/`, mapped in `src/data/images.ts`.

| Asset | Location |
|-------|----------|
| Hero / facility | `hero-*.webp`, `facility-signed.webp` |
| Products | `erw.webp`, `fittings.webp`, `spiral.webp`, … |
| Industries | `refinery.webp`, `cement.webp`, … |
| Team / offices | `shripal-shah.webp`, `office-vatva.webp`, … |
| **Updates (yard photos)** | `updates/yard-NN-{640,960}.webp` |

### Updates media pipeline

1. Drop raw WhatsApp JPEGs in `public/images/navkar/`
2. Run `npm run process:updates` — converts to WebP in `updates/`, copies videos to `public/media/updates/`
3. Edit posts in `src/content/updates/*.md`

Raw WhatsApp filenames are not used in the site UI after processing.

## Still missing

- **Catalogue PDF** — replace `public/catalogue.pdf` when available
- **Transparent logo** — `logo.png` has a black background

## WordPress dump

`wp-content/` is gitignored. Do **not** deploy it.
