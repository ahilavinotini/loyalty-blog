# Points Calculator — Real Earn-Rate Iteration

Requirements doc for reworking `prototype.html` to use real BonusLink/AmBank Platinum
earn rates instead of the original prototype's placeholder numbers, with the goal of
credibly emphasizing points value for both existing (cold) BonusLink members and
people who don't have a card yet.

**Status:** requirements agreed, not yet implemented.

## Goal

Make the calculator's numbers real and defensible (not made up), and lean into the
categories where the real numbers tell a *better* story (travel) while being honest
about the ones where they don't (fuel).

## Confirmed inputs

- Redemption stays **RM1 = 100 pts** (unchanged).
- Earn rates are based on the AmBank BonusLink Visa **Platinum** card. No card-tier
  selector in this iteration — the calculator assumes Platinum throughout.
- Fuel: **litres = monthly RM spend ÷ RM1.99** (RON95 subsidised price). Member tier
  earns **1 pt/litre**; upgrades to Silver tier at **1.5 pts/litre** once cumulative
  fuel points hit **100**. That 100-point threshold **resets every 2-month billing
  cycle** (not monthly, not lifetime).
- **Remove the Bills question/category entirely.** Flow goes from 5 questions down
  to 4: fuel, dining & groceries, online, travel.
- Shopping/Online: affiliate brands earn different rates (Shein up to 14 pts/RM1
  among them). Use a **flat 1 pt/RM1 as the baseline calculation** across all
  brands — don't use any single brand's promotional rate as the basis. Surface
  "up to 14×" only as copy/tip text, not as a separate spotlight component.
- Cold-user vs. new-user differentiation is **explicitly deferred** — not being
  designed this round.

## New earn-rate table (Platinum card baseline)

| Category | Real rate | Source |
|---|---|---|
| Fuel | 1 pt/litre (Member) → 1.5 pt/litre (Silver) after 100 pts, resets every 2-month cycle | BonusLink fuel partner mechanic |
| Dining & Groceries | **1 pt/RM1** | AmBank Platinum card bucket |
| Shopping/Online | **1 pt/RM1** flat baseline (affiliate rates vary; up to 14× at brands like Shein — copy only) | AmBank Platinum "Shopping" bucket + affiliate rates |
| Travel | **12 pts/RM1** | Hotel-stay partner rate |
| ~~Bills~~ | removed | — |

## Fuel: cycle-based tier math

The calculator collects a **monthly average** spend, but the Silver-tier threshold
resets every **2 months**. To stay accurate, compute at the cycle level and average
back down to a monthly figure:

```js
function ptsForFuel(monthlySpend) {
  const cycleLitres = (monthlySpend * 2) / 1.99;      // 2-month cycle total
  const memberLitres = Math.min(cycleLitres, 100);     // first 100 pts worth @ 1pt/litre
  const silverLitres = Math.max(0, cycleLitres - 100); // remainder @ 1.5pt/litre
  const cyclePts = memberLitres * 1 + silverLitres * 1.5;
  return cyclePts / 2;                                 // back to a monthly average
}
```

This plugs into `ptsForKey()` / `monthlyTotal()` unchanged — everything downstream
(period projections, results totals) already works off a monthly-points figure and
scales by month count, so cycle accuracy is preserved at any period (1mo/6mo/1yr).

**Fuel step UI**: bring back a tier progress bar (reusing the existing mini-tier
CSS/pattern), recalibrated to the real threshold — progress toward 100 litres within
the current 2-month cycle, with a marker at the Member→Silver crossover, and copy
explaining the cycle briefly (e.g. "BonusLink cycles run every 2 months — cross 100
pts of fuel and the rest of that cycle earns 1.5×/litre").

**Sanity check**: RM100/mo fuel → cycle litres = 200/1.99 ≈ 100.5 → 100 @1pt +
0.5 @1.5pt = 100.75 cycle pts → ≈50.4 pts/mo.

## Judgment calls (flag anything that's off)

1. **Groceries step becomes "Dining & Groceries."** The real card bundles them at
   one rate, and today's calculator never asks about eating-out spend at all. Will
   bump its presets/average-spend numbers up slightly to reflect the combined
   category (estimate, not sourced data).
2. **Travel's 12× applies to the whole category** (flights + hotels), even though
   the source specifically said "on every stay" (hotels only). Flagging in case
   flights should be split out at a lower rate later.
3. **No tier *selectors* added to the flow** — the calculator doesn't ask "are you
   Member or Silver"; tier progress is derived purely from the fuel amount entered
   (the cycle math above models the transition automatically).
4. **Cold vs. new user CTA branching stays out of scope** — results screen keeps
   one generic CTA; revisit once that direction is decided.

## Changes required (all within `prototype.html`)

- **`DATA` block** — replace `EARN_RATES` with the real structure above; remove all
  `bills` references (`EMPTY_SPEND`, `PRESETS`, `MY_AVERAGE_SPEND`,
  `ALL_SPEND_KEYS`); remove `'bills'` from `STEP_IDS`; drop `NUM_QUESTIONS` in
  `stepFrame()` from 5 → 4; re-tune `MY_AVERAGE_SPEND`/comparison baseline for the
  new rates and merged dining+groceries category.
- **`ptsForKey()`** — replace fuel's flat-rate/RM100-threshold logic with the
  cycle-based formula above.
- **`groceriesStepHtml()`** — reframe to "Dining & Groceries" (title, subtitle,
  presets, tip copy, adjusted preset amounts).
- **`fuelStepHtml()` / mini-tier** — recalibrate the existing progress-bar pattern
  to the real 100-litre/2-month-cycle threshold instead of the old RM100 mechanic;
  update tip copy.
- **`onlineStepHtml()`** — rate to flat 1×; tip copy mentions "up to 14 pts/RM1 at
  select affiliate brands like Shein" (reusing the existing `.step-tip` element, no
  new component).
- **`travelStepHtml()`** — rate to 12×; rewrite tip/copy to lead with this number.
- **`billsStepHtml()`, its `case 'bills'` branches, and its `zero-next`/data
  references** — delete entirely.
- **Question numbering** — update all remaining steps' `questionIndex`/`category`
  labels ("Question X of 5" → "of 4") to match the new 4-question flow; fix welcome
  screen's "6 questions" stat to say "4 questions" (was already inaccurate
  pre-existing copy, worth correcting now).
- **Desktop context-panel stats** (`.desktop-context-meta`) — replace the three
  stats with real, compelling numbers: "100 pts = RM1", "12× pts on every hotel
  stay", "up to 14× pts at affiliate brands".
- **`resultsStepHtml()` / `computeResults()` / `DONUT_KEYS`** — remove bills from
  the breakdown; recalculate against new rates; re-tune redemption catalogue point
  costs if new totals run much lower/higher than before.

## Verification (once implemented)

- Hand-check fuel math against the sanity check above; RM500/mo travel → 6,000
  pts/mo.
- Re-run the Playwright driver (`/Users/fiona/.claude/jobs/1eb18c46/tmp/drive_prototype.py`,
  updated for the new 4-step flow/selectors) through the full flow + results,
  confirm zero console errors.
- Screenshot the welcome/context-panel stats and the reworked fuel step
  (recalibrated tier bar) to sanity-check against `tokens.css`/`app.css`
  conventions.
- Confirm the online step's tip text reads naturally with the "up to 14×" mention,
  and that Bills is fully gone (no orphaned references, no "of 5" label ever
  showing).
