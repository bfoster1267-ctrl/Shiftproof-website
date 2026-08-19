# Social cards

`og-card.html` renders both 1200x630 `og:image` cards. Regenerate after any
change to the wordmark, the claim, the embedded screenshot, or the domain.

- `?card=home` → `assets/WageTally-og.jpg`, used by the homepage and every guide.
- `?card=ie` → `assets/WageTallyIE-og.jpg`, used by the Ireland beta page. This
  is the one that gets shared in tester outreach, and the only one carrying a
  device shot.

The device shot is windowed out of `assets/web/WageTallyIE-02-BuiltAroundHSEPay.jpg`
with the same percentages `styles.css` uses, so there is no separate asset to
keep in step — regenerating the screenshots regenerates the card.

The page needs to be served over HTTP rather than opened from disk, so the
embedded screenshot loads:

```
python3 -m http.server 8765 &
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for card in home ie; do
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1200,630 \
    --screenshot=/tmp/og-$card.png \
    "http://localhost:8765/tools/og-card.html?card=$card"
done
```

Then encode to JPEG. Both must stay well under ~300KB: WhatsApp silently drops
larger preview images, and these links are shared in DMs. At quality 92 they
currently come out at 46KB (home) and 85KB (ie).

**Never point `og:image` at an App Store composition.** Those are 1290x2796
portraits of 1.4MB, the wrong shape for a social card, and the pre-WageTally set
carries the old wordmark as its eyebrow — six pages were previewing as
SHIFTPROOF on LinkedIn before this file grew a second card.
