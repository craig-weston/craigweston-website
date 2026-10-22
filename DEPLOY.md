# Deploy craigweston.co.uk via GitHub + Cloudflare Pages

The site is static HTML/CSS/JS and lives in `public/`. It needs no Node.js install, framework, Cloudflare API token or GitHub Actions deployment secret.

## 1. Create the GitHub repository

Create a private or public repository named `craigweston-website` at https://github.com/new (or use https://repo.new). Private is fine for Cloudflare Pages.

From this repository folder, in a shell with GitHub access:

```bash
# If the repository has not been initialised yet:
# git init -b main
# git add . && git commit -m "Initial Craig Weston website"

git remote add origin https://github.com/YOUR_GITHUB_USERNAME/craigweston-website.git
git push -u origin main
```

If the origin already exists, use `git remote set-url origin ...` instead. Do not upload an additional README when creating the empty remote; this avoids a conflicting initial commit.

## 2. Enable Git-to-Cloudflare deployment

1. Sign into https://dash.cloudflare.com/.
2. Open **Workers & Pages → Create application → Pages → Connect to Git** (the exact labels may vary).
3. Authorise Cloudflare's GitHub app for this repository and select `craigweston-website`.
4. Set **production branch** to `main`.
5. Choose no framework preset. Set **build command** to `exit 0` and **build output directory** to `public`.
6. Deploy. Cloudflare gives you a preview address under `*.pages.dev`.

Subsequent pushes to `main` automatically publish. Pull requests/other branches can receive preview URLs. Check **Settings → Builds → Branch control** if this is not happening.

## 3. Connect craigweston.co.uk

After the Pages project is working:

1. Open the project in **Workers & Pages → Custom domains → Set up a domain**.
2. Enter `craigweston.co.uk` and follow the Cloudflare prompts.
3. For an apex/root domain Cloudflare needs the domain to be in your Cloudflare account, with the registrar nameservers pointing to Cloudflare. Do not guess or change DNS records until Cloudflare shows the exact values.
4. Add `www.craigweston.co.uk` too if required, and redirect it to the preferred canonical `https://craigweston.co.uk` in Cloudflare Redirect Rules.
5. Confirm HTTPS, then consider redirecting the `*.pages.dev` address to the custom domain to avoid duplicate indexing.
6. Add the property to Google Search Console and submit `https://craigweston.co.uk/sitemap.xml`.

## 4. Routine editing & auto publishing

```bash
# Make your changes in public/
python3 scripts/check_site.py
git add public
git commit -m "Update website content"
git push origin main
```

Cloudflare will rebuild and deploy. No second upload required.

## Publication checklist

Before pointing the live domain at the project, check the pages on the pages.dev preview URL, including navigation, phones, book links, MatchPoint interactions and accessibility. Confirm book availability, direct-order policies and contact details. Direct checkout is **not** connected: the current route is an enquiry only. MatchPoint workshop panels and example fixtures are conceptual demonstrations rather than verified participant interview findings. The UX book design image is an illustrative cover, not the publisher's cover.

### Source of UX book extracts
The 3 short book quotes on `ux-book.html` were checked against the user-supplied *UX Is Dead, Long Live UX* print interior (2026): Chapter 1, Chapter 3 and Step 3. The source PDF is deliberately **not** committed to this public website repository.

## Troubleshooting

- **404 on home page:** Build directory should be `public`, containing `index.html` directly.
- **No deploy after push:** Verify Cloudflare GitHub app authorisation and production branch `main`.
- **Site displays without styling:** Check the `styles.css` path and the `assets/` folder inside `public/`.
- **Domain not working:** Add the custom domain inside Pages first; do not only add a DNS record.
- **Cache issue:** The `_headers` file sends a short browser TTL for assets and no-cache on HTML.

## References
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
