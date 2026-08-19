# Moving the site to wagetally.ie

**Status as of 19 Aug 2026: blocked at the registry. Do not start.**

Run the checks in step 0 first. If they do not pass, nothing else in this file
should be touched — a custom domain set before DNS resolves takes the live site
down, because GitHub starts redirecting `bfoster1267-ctrl.github.io/Shiftproof-website`
to a hostname that does not answer.

## 0. The gate

`wagetally.ie` is registered but not delegated:

```
$ whois -h whois.weare.ie wagetally.ie
Creation Date: 2026-08-19T01:30:52Z
Registrar: GoDaddy.com, LLC
Domain Status: pendingCreate
Domain Status: serverHold        <- the registry is not publishing it
Name Server: ns31.domaincontrol.com
Name Server: ns32.domaincontrol.com
```

`serverHold` means IEDR is holding the domain out of the `.ie` zone while the
registration completes, so it resolves nowhere no matter what records exist at
GoDaddy. Nameservers are already assigned, so there is nothing to fix here and
nothing to hurry — it clears on the registry's side, typically within a day or
two of creation.

The gate is open when both of these return answers:

```
dig +short NS wagetally.ie          # expect ns31/ns32.domaincontrol.com
dig +short A  wagetally.ie          # expect whatever GoDaddy parks, then ours
```

## 1. DNS at GoDaddy, on wagetally.ie

Add, in the DNS panel for **wagetally.ie**. Values verified against GitHub's
current documentation on 19 Aug 2026:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| AAAA | @ | 2606:50c0:8000::153 | 600 |
| AAAA | @ | 2606:50c0:8001::153 | 600 |
| AAAA | @ | 2606:50c0:8002::153 | 600 |
| AAAA | @ | 2606:50c0:8003::153 | 600 |
| CNAME | www | bfoster1267-ctrl.github.io | 600 |

The `www` target is the **user** host with no repository path. All four A
records are needed; they are not alternatives.

Remove any GoDaddy **parking** A record on `@` that is not in the list above.
On wagetally.co.uk those are currently `13.248.243.5` and `76.223.105.230`, so
expect similar on the `.ie` once it publishes.

### Do not remove

Website records and mail records are different record types and coexist. Leave
alone, if present, anything of type **MX**, any **TXT** holding SPF
(`v=spf1 ... include:spf.protection.outlook.com ...`) or DKIM, any **CNAME** on
`autodiscover`, `selector1._domainkey`, `selector2._domainkey`, or
`enterpriseregistration` / `enterpriseenrollment`.

Deleting those breaks Microsoft 365 mail and does nothing for the website.

**Mail is not configured yet.** Neither domain has an MX record today:

```
$ dig +short MX wagetally.ie      # (nothing — domain does not resolve)
$ dig +short MX wagetally.co.uk   # (nothing)
```

So `hello@wagetally.ie` cannot receive mail, and the site must keep using the
Gmail address until an MX exists and a test message round-trips.

## 2. GitHub

Only after step 1's records resolve:

```
dig +short A wagetally.ie      # must return the four 185.199.x.153 addresses
```

Then in the repository, Settings → Pages → Custom domain, enter `wagetally.ie`
and save. GitHub writes a `CNAME` file to the branch — which is why step 3
writes the same file, so the branch and the setting agree rather than fighting.

Leave **Enforce HTTPS** unchecked until GitHub has issued the certificate. The
checkbox stays greyed out until then; it can take up to 24 hours after the DNS
resolves. Tick it as soon as it is available — until it is ticked the site
answers on plain HTTP.

## 3. The site, in one commit

45 absolute URLs across 13 files, plus the `CNAME` file. Every internal link is
already relative, so the root path moving from `/Shiftproof-website/` to `/`
needs no other change.

```
OLD="https://bfoster1267-ctrl.github.io/Shiftproof-website"
NEW="https://wagetally.ie"
grep -rlI "$OLD" --exclude-dir=.git . | xargs sed -i '' "s#$OLD#$NEW#g"
printf 'wagetally.ie\n' > CNAME
grep -rI "$OLD" --exclude-dir=.git . ; echo "^ must be empty"
```

That covers 11 canonical tags, 11 sitemap `<loc>`s, 7 `og:image`s, 1 `og:url`,
the `robots.txt` sitemap line, and the three JSON-LD `url`/`logo` values. Do it
as one commit: a half-migrated set of canonicals tells search engines two
different things about the same page.

## 4. wagetally.co.uk

Secondary, and a **redirect only** — not a second copy of the site, which would
compete with wagetally.ie for the same search results.

Set it up as GoDaddy domain forwarding: Domain Settings → Forwarding → Add,
forward `wagetally.co.uk` to `https://wagetally.ie`, **permanent (301)**,
forward with masking **off**. Masking would keep the .co.uk address in the
address bar and serve the .ie site inside a frame, which reads as a phishing
page and hides the real canonical.

Current state, for reference:

```
wagetally.co.uk  NS  ns63.domaincontrol.com, ns64.domaincontrol.com
wagetally.co.uk  A   13.248.243.5, 76.223.105.230   (GoDaddy parking)
www.wagetally.co.uk CNAME wagetally.co.uk
```

## 5. Verifying

```
dig +short A wagetally.ie                       # four 185.199.x.153
dig +short CNAME www.wagetally.ie               # bfoster1267-ctrl.github.io
dig +short MX wagetally.ie                      # unchanged, if mail was set up

curl -sSI https://wagetally.ie | head -1        # HTTP/2 200
curl -sSI http://wagetally.ie | head -1         # 301 to https, once enforced
curl -sSI https://www.wagetally.ie | head -1    # 301 to apex
curl -sSI https://wagetally.co.uk | head -1     # 301 to https://wagetally.ie

curl -sS https://wagetally.ie/ | grep canonical # https://wagetally.ie/
curl -sS https://wagetally.ie/robots.txt        # sitemap on the new host
curl -sSI https://wagetally.ie/assets/WageTallyIE-og.jpg | head -1
```

Then re-scrape the social cards so the old previews are dropped, using
LinkedIn's Post Inspector and Facebook's Sharing Debugger on both
`https://wagetally.ie/` and `https://wagetally.ie/ireland-beta.html`. Until they
are re-scraped, shares can keep showing whatever those platforms cached against
the github.io URLs.
