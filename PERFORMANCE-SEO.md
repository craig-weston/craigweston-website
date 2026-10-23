# Website performance and SEO release audit · 23 October 2026

This release prioritises genuine reading speed, stable layouts and useful search metadata. It does **not** claim a Google Lighthouse score or guarantee search rankings. Test the public URL with Lighthouse/PageSpeed Insights after DNS/edge deployment has propagated, including the mobile profile and Core Web Vitals field data.

## What changed

1. **Artwork compression:** Re-encoded the existing sixteen WebP assets using careful quality settings without changing their dimensions, removing unnecessary encoding overhead. Visual quality was checked using downscaled structural similarity (approximately 0.993–1.000 versus originals in the static comparison).
2. **Smaller catalogue covers:** Added 480px wide WebP thumbnails and `srcset`/`sizes` so phones and smaller cards receive smaller files rather than downloading 950px full-size illustrations. Original covers remain available for high-resolution presentation.
3. **Fewer stylesheet requests:** Four cascade layers are consolidated into `site.min.css`. MatchPoint receives a dedicated `matchpoint.min.css` preserving its existing cascade order. Fixed a malformed fragment at the start of the legacy `styles.css` source.
4. **Core Web Vitals fundamentals:** Explicit image dimensions to reserve space, lazy loading of below-the-fold images, high priority for leading imagery, asynchronous image decoding and a preload hint for the homepage hero artwork.
5. **Technical SEO:** Distinct canonical URLs, existing human-written page titles/descriptions preserved, Twitter/Open Graph metadata improved, Person/WebSite/Breadcrumb/CreativeWork/CollectionPage JSON-LD where relevant, valid XML sitemap with updated dates, explicit robot rules.
6. **Caching and headers:** Static images are cached for one day, styles/scripts for one hour and HTML stays revalidatable. Existing security headers are preserved.
7. **Repeatable checks:** Added `scripts/check_seo.py` alongside the existing static asset validator.

## Honest trade-offs

- Full-size book art is retained intentionally: the site is a visual portfolio and visitors may view large cover images.
- Google Fonts still adds third-party font requests; `display=swap` and preconnect are already configured. Consider self-hosting a deliberately reduced WOFF2 subset in a separate design review if font costs dominate a real-world trace.
- PageSpeed scores are affected by location, connection, device, caches and external font availability. Synthetic smoke checks cannot prove real-user Core Web Vitals.
- An image `srcset` is a browser hint. Exact network savings depend on pixel density and chosen image candidate.

## Verification

Run locally:

```sh
python3 scripts/check_site.py
python3 scripts/check_seo.py
python3 -m http.server --directory public 8000
```

On the live site, check `/sitemap.xml`, `/robots.txt`, Open Graph link previews, Google Search Console URL inspection, and a fresh mobile Lighthouse trace. The site is deployed through Cloudflare Pages from GitHub `main`; push to `main` to publish approved changes.
