# Accessibility review — Craig Weston website V7

## Automated smoke checks (22 October 2026)

- Seven pages checked at 1440px, 390px and 320px widths in Chromium.
- Custom computed-color contrast sampling: zero text contrast flags in all 21 viewport/page combinations. Note: complex photographic/gradient backgrounds, pseudo-elements, states and text embedded within images require further inspection.
- No horizontal document overflow at the measured widths.
- All sampled interactive elements expose a nonempty name; inspected image elements have alt text.
- Interactive design-method tabs pass click and ArrowRight keyboard tests. MatchPoint tennis and badminton scoring interactions pass smoke tests.
- Reduced-motion media styles and visible focus outlines included.

## Important limits

This is **not** an independent WCAG 2.2 certification. A complete axe-core scan, screen reader trials, zoom testing at 200% and 400%, keyboard-only journey tests, colour blindness checks, real-device contrast and external review remain advisable before asserting full compliance.

Use `python3 scripts/check_site.py` for local structural checks. `scripts/browser_audit.py` contains further browser-based checks for this workspace.
