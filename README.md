# Craig Weston — portfolio and bookshop

Deployment-ready static website for Craig Weston, featuring an editorial homepage, accessible design principles, the MatchPoint product case study, and the illustrated Japan book collection.

## Latest design update

- New bespoke dark UX/Japan studio scene used in the homepage hero (`public/assets/hero-ux-japan.webp`, 1672×941, compressed).
- Removed the decorative Ideas & curiosity circle.
- Made the header social controls icon-only with meaningful accessible labels.
- Updated the subtitle beneath the site name to **AUTHOR**.
- Removed a duplicate homepage social-links row; Instagram and LinkedIn remain accessible through the header and footer.
- Retains responsive typography, dark theme, real Japan-book artwork and interactive MatchPoint case study.

## Development

There is no build step. `public/` is the production-ready output.

```bash
python3 scripts/check_site.py
python3 -m http.server 8000 --directory public
```

Open `http://localhost:8000/`.

## Cloudflare Pages deployment

1. Create repository `craig-weston/craigweston-website` and push `main`.
2. In Cloudflare Pages, connect that repository as the Git source.
3. Production branch: `main`; build command: `exit 0`; output directory: `public`.
4. Verify `*.pages.dev` and then add `craigweston.co.uk` under **Custom domains**.
5. Pushes to `main` will then deploy automatically.

See `DEPLOY.md` for step-by-step details. Do not update existing production DNS records before the Pages preview has been verified.

## Caveats

- UX book mock cover is not a verified retail cover image.
- MatchPoint research boards and league fixture data are conceptual demonstration assets.
- Direct purchase remains an enquiry, not an integrated checkout.
- Individual Japanese-book Amazon URLs use verified author storefront or title searches until product ASINs are confirmed.

© 2026 Craig Weston.

## V7 improvements

- Interactive four-stage user-centred design method (keyboard-operable tablist).
- MatchPoint pain point to proposed solution and validation mapping.
- Genuine short excerpts from the supplied UX manuscript, clearly attributed.
- Project enquiry form composed using the visitor's email application (no server collection).
- Contrast fixes and responsive audits across seven pages.
- `finish.css` and `finish.js` loaded after the existing site assets.

## Performance and search

This static site is optimised for low network overhead and reliable discovery. The production pages use a single, cached CSS bundle (with a separate MatchPoint bundle); catalogue images use responsive 480px thumbnails; all images have intrinsic dimensions and accessible alternatives; and each page has unique canonical metadata and JSON-LD. The Japanese cover illustrations retain full-resolution originals for larger displays. See [`PERFORMANCE-SEO.md`](PERFORMANCE-SEO.md) for methodology, byte-size comparisons, deployment headers and verification limitations.

```bash
python3 scripts/check_site.py
python3 scripts/check_seo.py
```
