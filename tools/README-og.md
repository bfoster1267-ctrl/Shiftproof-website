# Social card

`og-card.html` renders the 1200x630 `og:image`. Regenerate after any change to
the wordmark, the claim, or the embedded screenshot:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot=/tmp/og.png \
  http://localhost:8765/tools/og-card.html
```

Then encode to JPEG. It must stay well under ~300KB: WhatsApp silently drops
larger preview images, and this link is shared in DMs.
