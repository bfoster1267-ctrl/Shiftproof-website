# WageTally Marketing Website

Static marketing site for WageTally, an iPhone app that works out expected gross
pay for the shifts you actually worked so you can hold it against your payslip.

Served by GitHub Pages from `main` at the repository root. The repository is
still named `Shiftproof-website` and the live URL is still
`https://bfoster1267-ctrl.github.io/Shiftproof-website/` — the app was called
ShiftProof until the 1.4 rebrand, and the repository name is deliberately not
being churned.

The canonical domain is **`wage-tally.com`**, and this branch is prepared for it
but not yet live on it. Ireland is `/ie/` on that domain rather than a `.ie`
address; `wagetally.co.uk` is reserved for a future UK launch and must not be
configured. See `tools/README-domain.md`.

No build step. Edit the HTML, commit, push.

## Layout

| Path | What it is |
|---|---|
| `index.html` | Homepage. The general product story, in dollars, plus an Ireland doorway under the hero. |
| `ie/index.html` | Ireland/HSE tester recruitment, served at `/ie/`. The page outreach links to. |
| `articles/` | Five guides plus an index. |
| `privacy.html` `terms.html` `support.html` | Policy and FAQ. |
| `styles.css` | Everything. One stylesheet, cache-busted with `?v=N` in every page. |
| `main.js` | Mobile menu, FAQ, homepage gallery, and the Ireland beta form. |
| `assets/` | 1290×2796 App Store masters and the 1200×630 social cards. |
| `assets/web/` | 1400×3034 JPEGs — what the pages actually load. |
| `drafts/` | Not linked, and `Disallow`ed in `robots.txt`. |
| `tools/` | Generators and runbooks; nothing here is served as part of the site. |
| `CNAME` | `wage-tally.com`. Whichever branch Pages deploys, this file *sets* the custom domain — see `tools/README-domain.md` before merging. |

**Bump `?v=N` on `styles.css` in every page whenever the stylesheet changes**,
or returning visitors keep the old one.

## The Ireland beta form

The form posts nowhere until `BETA_FORM_ENDPOINT` at the top of `main.js` is
set. Create a form at formspree.io, paste its endpoint there, and the normal
AJAX path takes over. Until then the form deliberately shows applicants a panel
saying nothing was sent, with the TestFlight link and a pre-filled email.

Do not put a placeholder id in the markup. The previous one posted applicants to
a third-party 404.

## Screenshots and social cards

- `assets/WageTallyIE-Screenshot-Spec.md` — the Ireland set: how it was
  captured, and the real data behind every figure in it.
- `assets/ShiftProof-Screenshot-Spec.md` — the older US App Store set, still
  used on the homepage and guides. Those files keep the old name because that is
  what they are; the app UI inside them carries no branding, and the pages crop
  to the device.
- `tools/README-og.md` — regenerating the two 1200×630 `og:image` cards.

## Contact

The site publishes `bfoster1267@gmail.com`. A professional mailbox on
`wage-tally.com` is being set up separately; the domain has no MX record yet.
**Do not swap the address anywhere until a test message has both sent and
received successfully.** No dead addresses get published.

## Local testing

```
python3 -m http.server 8000
```

Then check: links resolve, images load, the mobile menu opens and closes, FAQ
items expand, the beta form shows the unconfigured panel rather than a success
state, and the console is clean.

## Accessibility

Semantic sectioning, one `h1` per page, alt text on every image, keyboard
navigation with visible focus rings, `aria-expanded` on the menu and FAQ
controls, and `prefers-reduced-motion` honoured by the homepage gallery.
