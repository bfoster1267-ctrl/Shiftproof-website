# Domains

**Global canonical: `wage-tally.com`.** The site is prepared for it on this
branch and not yet live on it — `main` still deploys to
`bfoster1267-ctrl.github.io/Shiftproof-website`.

| Domain | Role | State |
|---|---|---|
| `wage-tally.com` | Global canonical, all content | Owned, delegated, parked. Not yet pointed at Pages. |
| `wage-tally.com/ie/` | Ireland launch and beta | Prepared on this branch |
| `wagetally.co.uk` | **Reserved for a future UK launch** | Owned, parked. Do not configure. |
| `wagetally.ie` | Not owned, not planned | See below |

## wagetally.ie is not part of the launch

`.ie` requires demonstrating an Irish connection, and the registry asked for
qualifying documentation we cannot currently provide. **Nothing in the launch
depends on it and no `.ie` work should be attempted.**

The Ireland signal comes from `hreflang="en-IE"` on `/ie/` instead of from a
ccTLD, which is the standard way to target a country without one. The set is
reciprocal — `/` and `/ie/` carry identical `alternate` blocks — because
one-directional hreflang is ignored.

If eligibility is ever established, `wagetally.ie` becomes a 301 to
`https://wage-tally.com/ie/` and nothing else changes. Do not design around it.

## 1. DNS at GoDaddy, on wage-tally.com

Values verified against GitHub's live documentation on 19 Aug 2026.

| Action | Type | Host | Value | TTL |
|---|---|---|---|---|
| add | A | @ | 185.199.108.153 | 600 |
| add | A | @ | 185.199.109.153 | 600 |
| add | A | @ | 185.199.110.153 | 600 |
| add | A | @ | 185.199.111.153 | 600 |
| add | AAAA | @ | 2606:50c0:8000::153 | 600 |
| add | AAAA | @ | 2606:50c0:8001::153 | 600 |
| add | AAAA | @ | 2606:50c0:8002::153 | 600 |
| add | AAAA | @ | 2606:50c0:8003::153 | 600 |
| replace | CNAME | www | `bfoster1267-ctrl.github.io` | 600 |
| **remove** | A | @ | `15.197.148.33`, `3.33.130.190` — GoDaddy parking | — |

All four A records are required; they are not alternatives. The `www` target is
the **user** host with no repository path.

### Do not delete, once mail is set up

Web and mail are different record types and coexist. Leave alone any `MX`; any
`TXT` holding SPF (`v=spf1 … include:spf.protection.outlook.com …`), DKIM, or
the `MS=ms…` verification string; and any `CNAME` on `autodiscover`,
`selector1._domainkey`, `selector2._domainkey`, `enterpriseregistration` or
`enterpriseenrollment`. Removing them breaks Microsoft 365 and does nothing for
the website.

At the time of writing `wage-tally.com` has **no MX record**, so no mailbox
exists yet. That is why the site still publishes the Gmail address.

## 2. GitHub Pages

Source stays `main` / root. One custom domain per Pages site, which is why
`wagetally.co.uk` has to be registrar forwarding rather than a second domain
here.

⚠️ **The `CNAME` file is the setting.** When a `CNAME` file lands on the
deployment branch, GitHub sets the custom domain from it. This branch carries
`CNAME` containing `wage-tally.com`, which is harmless here because `main` is
the deployment source — but **merging before DNS resolves takes the live site
down**, since GitHub immediately starts 301ing the working github.io URL to a
hostname that answers nowhere.

So the gate is:

```
dig +short A wage-tally.com     # must return the four 185.199.x.153 addresses
```

Merge only after that passes. Then confirm Settings → Pages shows
`wage-tally.com`, and tick **Enforce HTTPS** once the certificate issues — the
checkbox stays greyed out until then, up to 24 hours. Until it is ticked the
site answers on plain HTTP.

## 3. What the migration already did on this branch

- `ireland-beta.html` → `ie/index.html`, with all 21 of its relative paths
  re-pointed at `../`, matching how `articles/` already works.
- Every internal link to the old page → `ie/` (or `../ie/` from a subdirectory).
- 11 canonicals, 11 sitemap `<loc>`s, 7 `og:image`s, 1 `og:url`, 3 JSON-LD
  URLs and the `robots.txt` sitemap line → `https://wage-tally.com`.
- Reciprocal `hreflang` on `/` and `/ie/`.
- `CNAME` containing `wage-tally.com`.

No redirect stub was left at `ireland-beta.html`. That URL was never served —
the Ireland page has only ever existed on this branch — so there is nothing to
preserve, and GitHub Pages has no server-side redirects anyway.

## 4. wagetally.co.uk

**Reserved for the UK launch. Do not configure it as part of this migration.**

It must never be the Irish canonical. When you do want it to stop being a
parking page, the interim move is GoDaddy Domain Settings → Forwarding → forward
`wagetally.co.uk` to `https://wage-tally.com`, **permanent (301)**, masking
**off**. Masking keeps the .co.uk address in the bar while serving another
site's content, which reads as a phishing page and hides the real canonical.
That forward is reversed the day `/uk/` exists.

Current state:

```
wagetally.co.uk      NS     ns63.domaincontrol.com, ns64.domaincontrol.com
wagetally.co.uk      A      13.248.243.5, 76.223.105.230   (GoDaddy parking)
www.wagetally.co.uk  CNAME  wagetally.co.uk
wagetally.co.uk      MX     (none)
```

## 5. Verifying after the cutover

```
dig +short A wage-tally.com                       # four 185.199.x.153
dig +short CNAME www.wage-tally.com               # bfoster1267-ctrl.github.io
dig +short MX wage-tally.com                      # unchanged, if mail was set up

curl -sSI https://wage-tally.com | head -1        # HTTP/2 200
curl -sSI http://wage-tally.com | head -1         # 301 to https, once enforced
curl -sSI https://www.wage-tally.com | head -1    # 301 to apex
curl -sSI https://wage-tally.com/ie/ | head -1    # HTTP/2 200
curl -sSI https://bfoster1267-ctrl.github.io/Shiftproof-website/ | head -1   # 301

curl -sS https://wage-tally.com/ | grep -E 'canonical|hreflang'
curl -sS https://wage-tally.com/robots.txt
curl -sSI https://wage-tally.com/assets/WageTallyIE-og.jpg | head -1
```

Then add `https://wage-tally.com` as a new Search Console property and submit
the sitemap, and re-scrape both cards with LinkedIn Post Inspector and
Facebook's Sharing Debugger — for `/` and for `/ie/`. Until they are re-scraped
those platforms can keep serving previews cached against the github.io URLs.

## 6. A note on the hyphen

`wagetally.com`, without the hyphen, belongs to someone else — registered
2026-06-17 through DreamHost behind privacy protection, resolving nowhere today.
The brand has no hyphen in it, so people will type that one. Worth an
acquisition enquiry; failing that, always share clickable links rather than
dictating the address.
