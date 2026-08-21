# WageTally — Ireland screenshot set

Four composites for the Ireland beta page, replacing the three `ShiftProofIE-*`
ones. Those could not be retouched: they carried the old name in two separate
layers — the marketing eyebrow, and the app's own interface inside the phone
("above ShiftProof's estimate"). Both had to come from a real build.

Captured from **WageTally 1.4 (6)** running in the iOS Simulator (iPhone 17 Pro,
1206 × 2622 native), region Ireland, workplace time zone Europe/Dublin. No UI was
redrawn, moved or invented, and nothing in the app repository was changed to
produce them.

## Shared system

Unchanged from `ShiftProof-Screenshot-Spec.md`, so the two generations read as
one family:

- Canvas 1290 × 2796, RGB, no alpha.
- `radial-gradient(ellipse at 50% 26%, rgba(70,132,255,.30), transparent 60%)`
  over `linear-gradient(165deg, #060a16 → #0b1630 → #122448 → #16305e)`, with a
  1px noise tile at 5% to break gradient banding.
- Eyebrow "WageTally", 34px/700, 6px tracking, `#5C8DFF`. Headline 118–126px/800,
  white, −3px tracking. Subheadline 52px/500, `#A9BEE3`. Copy block centred,
  starting at y 155.
- Device: 16px black-gradient bezel, 132px outer radius / 118px inner, layered
  drop shadow plus a blue radial glow behind.
- Built as static HTML/CSS and rasterised by headless Chrome at exactly
  1290 × 2796, one invocation per screenshot.

**Device geometry is measured, not chosen.** `styles.css` windows onto the phone
at 759 × 1612 from x 265, so the composites put the bezel box at 758 × 1611 from
x 266 — within a pixel, and the screen inside it is 726 × 1579, which is exactly
the 1206 × 2622 capture aspect. Nothing is stretched. The device top is 980 on
all four, so every slide takes the same `--crop-y: -60.794%` (−980/1612).

## The data behind the figures

One workplace, six shifts, entered by hand through the app's own UI. Every euro
figure below is the app's output, not a number written into a mockup.

Staff Nurse / Registered Midwife, **Pay Point 5 — €44,213**, which the app turns
into **€22.60/hour** (44,213 ÷ 52.18 weeks ÷ 37.5 hours, both divisors stated by
the HSE). 5-over-7 roster: yes. Biweekly period **4–17 Aug 2026**, 30-minute
unpaid break, deducted from the end of each shift.

| Shift | Times | Premiums the app applied |
|---|---|---|
| Tue 4 Aug | 07:00–19:00 | twilight |
| Wed 5 Aug | 07:00–19:00 | twilight |
| Sun 9 Aug | 07:00–19:00 | Sunday 100%, twilight |
| Thu 13 Aug | 19:00–07:00 | night duty 25%, twilight |
| Sat 15 Aug | 07:00–19:00 | Saturday allowance €19.20, twilight |
| Sun 16 Aug | 07:00–19:00 | Sunday 100%, twilight |

69.00 hours, no overtime — 34.5 in each week, under the 37.5 threshold, so no
screen leans on the weekday-overtime gap the app declines to calculate.

Period totals: **€2,170.44** calculated from the pay rules, plus a **€107.24**
Location allowance entered by hand, giving **€2,277.68** expected gross.

Two user-entered figures appear, and both are grounded in the app's own
disclosure of what it leaves out:

- **Location allowance €107.24** — €2,798/yr ÷ 52.18 × 2.
- **Reported payslip €2,438.81**, which is expected gross plus **€161.13**, the
  Specialist Qualification allowance at €4,204/yr ÷ 52.18 × 2. That is the
  unexplained difference screenshot 06 shows: a real allowance WageTally states
  it does not calculate, surfaced as a gap rather than silently absorbed.

## The four

| File | Screen | Headline |
|---|---|---|
| `WageTallyIE-02-BuiltAroundHSEPay` | Edit Workplace, HSE pay scale | Built around HSE pay |
| `WageTallyIE-04-EveryPremiumExplained` | Shift Detail, 13 Aug night shift | Every premium, explained |
| `WageTallyIE-06-CompareAgainstYourPayslip` | Paycheck Audit | Compare it with your payslip |
| `WageTallyIE-08-ItTellsYouWhatItDoesntKnow` | What WageTally Leaves Out | It tells you what it doesn't know |

The fourth is new. The app's honesty about its own limits is the strongest thing
it has to say to a nurse who has never heard of it, and it was the one screen the
old set left on the floor. It made the gallery four wide, so `.ie-screens` became
a 2-up rather than orphaning it — the same fix `.steps-four` already uses.

Masters are PNG at 1290 × 2796; `assets/web/` carries 1400 × 3034 JPEGs, the
convention the rest of the site already uses, at 250–340 KB each.
