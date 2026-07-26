# ShiftProof Marketing Website

A production-ready, static marketing website for ShiftProof — an iOS app that helps hourly workers track shifts and calculate expected gross pay.

## What's Inside

- **`index.html`** — Landing page with hero, features, pricing, and call-to-actions
- **`privacy.html`** — Privacy Policy (required for App Store submission)
- **`terms.html`** — Terms of Use
- **`support.html`** — Support page with FAQ
- **`styles.css`** — Complete design system (dark theme, responsive, accessible)
- **`main.js`** — Minimal vanilla JS (mobile menu, FAQ accordion)
- **`/assets/`** — Folder for the 8 App Store screenshots (1290×2796 each)
- **`robots.txt`** & **`sitemap.xml`** — SEO helpers
- **`.nojekyll`** — Tells GitHub Pages to serve files as-is

## Design System

The website matches the premium, dark aesthetic of the ShiftProof iOS app:

- **Colors:** Deep navy gradient background with brand blue accents (#5C8DFF)
- **Typography:** System fonts (SF Pro Display) with large, bold headlines
- **Components:** Glass cards, pill buttons, responsive grid layouts
- **Accessibility:** Semantic HTML, keyboard navigation, `prefers-reduced-motion` support
- **Responsive:** Mobile-first, works on all screen sizes

## Deploying to GitHub Pages (Free Hosting)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **New** (top-left) to create a new repository
3. Name it: `shiftproof` or `shiftproof-website`
4. Set to **Public**
5. Click **Create repository**

### Step 2: Clone & Add Your Files

On your Mac, in Terminal:

```bash
cd ~/Documents
git clone https://github.com/YOUR_USERNAME/shiftproof.git
cd shiftproof
```

Replace `YOUR_USERNAME` with your actual GitHub username.

Then copy the website files into this folder:
- `index.html`, `privacy.html`, `terms.html`, `support.html`
- `styles.css`, `main.js`
- `.nojekyll`, `robots.txt`, `sitemap.xml`
- `/assets/` folder with your 8 screenshot PNGs

### Step 3: Commit & Push

```bash
git add .
git commit -m "Add ShiftProof marketing website"
git push origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top-right)
3. Left sidebar → **Pages**
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

GitHub will deploy your site. Wait ~1 minute, then visit:

```
https://YOUR_USERNAME.github.io/shiftproof/
```

Your site is now live! 🎉

---

## Using a Custom Domain (Optional)

If you own `shiftproof.app` or another domain:

1. Create a file named `CNAME` (no extension) in the repo root with one line:
   ```
   shiftproof.app
   ```

2. Commit and push:
   ```bash
   git add CNAME
   git commit -m "Add custom domain CNAME"
   git push origin main
   ```

3. Update your domain registrar's DNS settings:
   - Point your domain's `A` record to GitHub's IPs (see [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site))
   - Or use a `CNAME` record pointing to `YOUR_USERNAME.github.io`

4. Wait for DNS to propagate (5 minutes to a few hours)

---

## Important Setup Notes

### App Store Screenshots

Place your 8 App Store screenshots in `/assets/` with these exact filenames:

- `ShiftProof-01-KnowYourNextPaycheck.png`
- `ShiftProof-02-AutomaticOvertime.png`
- `ShiftProof-03-TrackEveryShift.png`
- `ShiftProof-04-NeverMissPremiumPay.png`
- `ShiftProof-05-MonthlyEarnings.png`
- `ShiftProof-06-BuiltForEveryHourlyWorker.png`
- `ShiftProof-07-FreeToStart.png`
- `ShiftProof-08-StopGuessing.png`

Each should be 1290×2796 px (iPhone App Store format).

### TODO Items to Update

Before final deployment, search the code for `TODO:` comments and update:

1. **App Store URL** (in `index.html`):
   - Replace `href="#"` with your actual App Store link
   - Example: `https://apps.apple.com/us/app/shiftproof/id1234567890`

2. **Contact Email** (in all pages):
   - Change `support@shiftproof.app` to your actual support email
   - Or update the `mailto:` links

3. **Governing Law** (in `terms.html`):
   - Add your state and jurisdiction for legal disputes

---

## Mobile Responsiveness

The site is fully responsive:

- **Mobile (< 768px):** Single column, stacked sections, touch-friendly navigation
- **Desktop (768px+):** Multi-column layouts, larger typography, optimized spacing

Test on different devices or use DevTools (Chrome F12, Safari Develop → Enter Responsive Design Mode).

---

## Accessibility

The site meets WCAG 2.1 Level AA standards:

- Semantic HTML (`<section>`, `<header>`, `<footer>`, etc.)
- Sufficient color contrast (tested against white text on navy background)
- Keyboard navigation (Tab to navigate, Enter to activate buttons)
- Screen reader friendly (alt text on all images, aria labels)
- `prefers-reduced-motion` support (animations disabled for users who prefer it)

---

## Local Testing

Before deploying, test locally:

1. Open `index.html` directly in your browser (e.g., `File → Open`)
   - Or use `python3 -m http.server 8000` and visit `http://localhost:8000`

2. Check:
   - All links work (internal links, footer links)
   - Screenshots load (or placeholder boxes appear)
   - Mobile menu opens/closes on small screens
   - FAQ items expand/collapse
   - No console errors

---

## Updating Content

To edit text or styling:

1. Open the `.html` file in a code editor
2. Make your changes
3. Save and refresh your browser

To update the live site:

```bash
git add .
git commit -m "Update [what changed]"
git push origin main
```

GitHub Pages rebuilds automatically (usually within ~30 seconds).

---

## Support

For questions about GitHub Pages deployment, see the [official GitHub Pages documentation](https://docs.github.com/en/pages).

For website questions, refer to the code comments and the design system notes in `styles.css`.

---

## License

This website is part of ShiftProof. All content, design, and code are proprietary to ShiftProof.

---

**Ready to go live?** Follow the steps above, and your marketing site will be live on GitHub Pages in minutes!
