# Domain connectivity: craigweston.co.uk

## Verified issue (25 October 2026)

Public Google DNS resolved `craigweston.co.uk` to `85.233.160.22`, with an answer served by `85.233.160.68` (old hosting), while Cloudflare's own zone is configured with a Worker Custom Domain. A live HTTPS browser check of the apex timed out. The GitHub-connected Pages subdomain loads properly. This shows that public DNS is not yet directing all traffic to the active Cloudflare zone.

## Action required at domain registrar

1. Sign into the service where `craigweston.co.uk` was purchased (not Cloudflare DNS unless Cloudflare is the registrar).
2. Change authoritative nameservers for the domain to `jack.ns.cloudflare.com` and `macy.ns.cloudflare.com`. Remove old `ns0.phase8.net`, `ns1.phase8.net`, and `ns2.phase8.net` entries if present.
3. If DNSSEC uses an old DS record at the registrar, disable or replace that DS record before switching nameservers.
4. Allow DNS TTL/caches to refresh; verify public authoritative NS and that A/AAAA answers are served by Cloudflare, then test `https://craigweston.co.uk/`.

## Routing and deployments

GitHub `main` -> Cloudflare Pages `craigweston-website.pages.dev` (automatic deployments). Worker `craigweston-site-bridge` proxies `craigweston.co.uk` to Pages via `infra/cloudflare-domain-bridge.js`. The Worker was tested successfully on its `workers.dev` endpoint. Cloudflare manages the apex DNS `AAAA 100::` record for the Worker Custom Domain; do not attempt to delete this read-only record. This bridge avoids an earlier Pages custom-domain validation problem. The Google DNS response above may be cached or out of date later: always check live public DNS before taking further action.
