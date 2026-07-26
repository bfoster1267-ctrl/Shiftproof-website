# ShiftProof — App Store Screenshot Marketing Specification

All 8 screenshots share one design system so the set reads as a single premium gallery:

**Shared system**
- Canvas: 1290 × 2796 px (iPhone 6.9" App Store slot), RGB, no alpha.
- Background: `radial-gradient(ellipse at 50% 26%, rgba(70,132,255,0.30), transparent 60%)` over `linear-gradient(165deg, #060a16 → #0b1630 → #122448 → #16305e)`. A 1px noise texture at 5% opacity breaks up gradient banding.
- Eyebrow label: "SHIFTPROOF", 34px, weight 700, 6px letter-spacing, uppercase, #5C8DFF.
- Headline: 112–132px, weight 800, white, -3px letter-spacing, 1.04 line-height. Sized down slightly (112px) on the two copy-heavier screens (6, 7) so the layout stays uncluttered.
- Subheadline: 52px, weight 500, #A9BEE3, 1.35 line-height.
- Device mockup: real ShiftProof screenshots (captured from the actual running app on an iPhone 17 Pro Max simulator, 1320×2868 native) wrapped in a CSS bezel — 16px black-gradient frame, 132px outer radius / 118px inner radius, layered drop shadow (`0 90px 160px rgba(0,0,0,.7)` + `0 50px 90px rgba(6,12,26,.6)`) plus a soft blue radial glow behind the device for lift. The Dynamic Island and status bar are the OS's own — nothing was drawn on top of the interface.
- Typeface throughout: `-apple-system / SF Pro Display` stack — same system font the app itself uses, so headline type and in-screen type feel like one family.

No UI was redrawn, moved, or invented. Every screen inside a phone frame is a real, uncropped capture of ShiftProof running with realistic seeded data (a $40/hr base rate; $5/$3/$10 night/weekend/holiday differentials; $4/$2/$1 charge/preceptor/float premiums; five real shifts spanning two pay periods, one of which crosses the 40-hour weekly overtime threshold and one worked as Charge role on a weekend).

---

## 1 — Know Your Next Paycheck
- **Purpose:** First-impression hero. Answers "why download this" in one glance: a real gross-pay number ($2,730.50) computed automatically from shifts already on the calendar.
- **Hierarchy:** Eyebrow → 2-line bold headline → subheadline → floating phone (Pay Period Detail screen: dates, worked/regular/overtime hours, gross pay, shift list).
- **Typography:** Headline 126px; the phone content itself supplies the numeric hierarchy (bold $2,730.50 vs. regular-weight row labels).
- **Spacing:** 150px top margin, 34px between headline and subheadline, phone begins at 920px giving ~590px of breathing room above it.
- **Composition:** Single centered column, classic Apple/Things3 hero layout.
- **Colors:** Standard system gradient; no accent overrides.
- **Animation suggestion (for a future App Preview video):** gross-pay figure counts up from $0 as the shift list populates row by row.
- **Visual emphasis:** the $2,730.50 gross-pay line is the single brightest/boldest element in the phone — everything else in the frame is deliberately quieter.

## 2 — Automatic Overtime
- **Purpose:** Proves the app does the hard math (OT thresholds) no spreadsheet or mental math can do quickly.
- **Hierarchy:** Headline → subheadline → Shift Detail screen showing Regular Hours 5.50 / Overtime Hours 6.00 side by side.
- **Typography:** Same system; headline kept to 2 short words per line for scan-ability.
- **Spacing:** Phone pushed slightly lower (970px) than screenshot 1 since this headline is shorter, keeping optical balance across the set.
- **Composition:** Centered; the "Overtime Hours 6.00" row sits almost exactly at the visual center of the whole canvas — the eye lands there first.
- **Colors:** Same gradient family; no special OT color-coding was added (would require altering the real UI, which is disallowed) — the real app's own black-on-white numerals carry the message.
- **Animation suggestion:** the Regular/Overtime split animates in as two stacked bars filling left-to-right.
- **Visual emphasis:** Overtime Hours row, by proximity to center and by being the payoff of the headline promise.

## 3 — Track Every Shift
- **Purpose:** Establishes the calendar as fast and uncluttered — the "system of record" underneath the pay math.
- **Hierarchy:** Headline → short subheadline → full month calendar with 5 real shift chips placed across the current work-week.
- **Typography:** Headline 126px in two balanced lines ("Track Every" / "Shift").
- **Spacing:** Generous 920px top-of-phone position; the calendar grid's own whitespace does the rest.
- **Composition:** The month grid is the real interaction surface of the app — no cropping was needed since the grid is naturally the hero of this screen.
- **Colors:** Untouched — the app's own light calendar surface reads clean against the dark marketing background, creating strong figure-ground contrast.
- **Animation suggestion:** a day cell taps and a shift chip pops in.
- **Visual emphasis:** the current week row (20–25), the only row with visible shift chips, naturally draws the eye.

## 4 — Never Miss Premium Pay
- **Purpose:** Sells the "hidden money" angle — differentials, bonuses, and role premiums the app tracks automatically.
- **Hierarchy:** Headline → 2-line subheadline listing the 3 concepts → Shift Detail for a real Saturday "Charge" role shift at $770.50.
- **Typography:** Headline 126px; subheadline explicitly enumerates "Differentials. Bonuses. Premium rates." to mirror the brief's exact vocabulary.
- **Spacing:** Matches screenshot 2's vertical rhythm (970px) for set-wide consistency between the two "Shift Detail" screens.
- **Composition:** Role: Charge and the $770.50 gross figure are both visible without scrolling — the two facts a viewer needs to connect (special role → higher pay) sit in the same viewport.
- **Colors:** Standard.
- **Animation suggestion:** the Role field flips from "Staff" to "Charge" and the gross-pay number ticks upward.
- **Visual emphasis:** Role: Charge row + $770.50, the two proof points of the "premium pay" claim.

## 5 — Monthly Earnings
- **Purpose:** Widens the lens from a single shift/period to a running income picture.
- **Hierarchy:** Headline → subheadline → Pay tab showing two real pay periods ($2,730.50 and $460.00) stacked.
- **Typography:** Headline 126px.
- **Spacing:** 920px phone position; the two pay-period cards sit near the top of the device with open space below — a deliberately calm, minimal screen rather than a padded fake list.
- **Composition:** Two real rows are enough to communicate "history you can look back on" without needing fabricated data.
- **Colors:** Standard.
- **Animation suggestion:** a third (blurred/locked) row could slide up from below to tease Pro's full history — not included here since it would require inventing UI.
- **Visual emphasis:** the two dollar figures, right-aligned and bold, in a clear vertical rhythm.

## 6 — Built For Every Hourly Worker
- **Purpose:** Broadens the target audience beyond healthcare — the single biggest positioning risk called out in the brief.
- **Hierarchy:** Headline (no subheadline, to leave room for the grid) → 2×4 grid of industry chips (Healthcare, Construction, Manufacturing, Retail, Warehouse, Hospitality, Utilities, Transportation) → small calendar mockup peeking in from the bottom.
- **Typography:** Headline reduced to 112px to fit two lines cleanly above the grid; chip labels 44px/weight 600.
- **Spacing:** Chips in a 30px-gap grid, each a soft glass pill (7% white fill, 14% white border) so they feel like UI-adjacent marketing elements, not a redesign of the app itself.
- **Composition:** Industry chips are pure marketing typography/iconography (emoji glyphs), not appropriated app UI — per the brief's rule against inventing interface, these are clearly outside any phone frame. The small calendar screenshot at the bottom keeps this screen visually tied to the rest of the set.
- **Colors:** Chips sit on the same base gradient; no new hues introduced.
- **Animation suggestion:** chips fade/stagger in one row at a time.
- **Visual emphasis:** even 2×4 grid, no single industry emphasized — intentional, since the message is breadth.

## 7 — Free To Start
- **Purpose:** Converts price-sensitive browsers by showing the free tier is genuinely useful, then the real subscribe screen for anyone ready to upgrade.
- **Hierarchy:** Headline → subheadline ("Professional forecasting with Pro. Elegant. Minimal.") → two-column Free/Pro comparison → real Subscription/paywall screen in a phone frame below.
- **Typography:** Headline 112px (one line); comparison column titles 46px/800; comparison line items 33px/500.
- **Spacing:** Comparison cards at 780px, phone at 1780px — clear top-to-bottom reading order: promise → proof (feature list) → proof (real price/screen).
- **Composition:** The Free/Pro columns are marketing-authored text but every line item is drawn directly from the app's real `FeatureGate`/entitlement logic (1 workplace, current+previous pay period, role premiums included free; unlimited workplaces, templates, recurrence, full history, exports, widget under Pro) — accurate, not invented. The phone below shows the actual paywall with real prices ($5.99/mo, $39.99/yr) matching App Store Connect.
- **Colors:** The Pro column gets a blue-tinted glass panel (`rgba(92,141,255,.12–.35)`) with a brighter border to visually signal "upgrade," while Free stays neutral gray-glass — the only intentional color deviation in the whole set, used to guide the eye toward conversion.
- **Animation suggestion:** Free card is static; Pro card's border pulses softly.
- **Visual emphasis:** the Pro price pill ("From $5.99/mo"), the ultimate conversion target of this screen.

## 8 — Stop Guessing
- **Purpose:** Closing argument / final call-to-action — restates the core promise once more and asks for the download.
- **Hierarchy:** Headline → subheadline → hero Pay Period Detail phone (same screen as #1, reinforcing the core proof point one more time) → standalone CTA pill "Download ShiftProof Free".
- **Typography:** Headline 126px; CTA pill 40px/weight 700 inside a glass-outline capsule (mirrors iOS button conventions without being an actual app control).
- **Spacing:** Phone raised to 860px (vs. 920px on screenshot 1) specifically to leave clean air between the device's bottom edge and the CTA pill at 130px-from-bottom — verified no overlap.
- **Composition:** Bookends the set — screenshot 1 opens with this exact screen as a promise, screenshot 8 closes with it as proof delivered, plus an explicit ask.
- **Colors:** Standard, with the CTA pill using a slightly brighter glass fill than screenshot 6/7's chips to read as the primary action.
- **Animation suggestion:** none needed — static close.
- **Visual emphasis:** the CTA pill is the last thing the eye lands on, by position and by being the only bordered, high-contrast pill on an otherwise phone-dominated frame.

---

### Production notes
- Source screens were captured with `xcrun simctl io screenshot` against a live ShiftProof build running in the iOS Simulator (iPhone 17 Pro Max) with realistic manually-entered data — no synthetic UI, no debug/preview code, no seed scripts shipped or left in the repository.
- Compositions were built as static HTML/CSS and rasterized with headless Chrome at exactly 1290×2796, one Chrome invocation per screenshot, verified byte-exact afterward with Pillow.
- Nothing in the ShiftProof Xcode project or repository was modified to produce these assets.
