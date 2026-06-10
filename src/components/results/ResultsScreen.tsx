import { RefreshCw, Share2, ArrowRight } from 'lucide-react';
import { HeroResult } from './HeroResult';
import { DonutBreakdown } from './DonutBreakdown';
import { Comparison } from './Comparison';
import { Redemptions } from './Redemptions';
import {
  PERIODS, MY_AVERAGE_SPEND, ALL_SPEND_KEYS,
  type Spend, type PeriodKey,
} from '../../lib/data';
import { ptsForKey, monthlyTotal } from '../../lib/points';

interface Props {
  spend: Spend;
  period: PeriodKey;
  onPeriodChange: (p: PeriodKey) => void;
  onRestart: () => void;
}

const DONUT_KEYS = [
  { key: 'fuel',      name: 'Fuel',            color: '#FF9E30' },
  { key: 'groceries', name: 'Groceries',       color: '#B8DF56' },
  { key: 'bills',     name: 'Bill payments',   color: '#098DFC' },
  { key: 'online',    name: 'Online shopping', color: '#A775E4' },
  { key: 'travel',    name: 'Travel',          color: '#26AAE1' },
];

export function ResultsScreen({ spend, period, onPeriodChange, onRestart }: Props) {
  const periodObj = PERIODS.find(p => p.key === period)!;
  const months = periodObj.months;

  const ptsByKey: Record<string, number> = {};
  ALL_SPEND_KEYS.forEach(k => { ptsByKey[k] = ptsForKey(k, spend[k] ?? 0); });
  const monthly = monthlyTotal(spend);
  const totalPts = Math.round(monthly * months);

  const donutSlices = DONUT_KEYS.map(d => {
    let pts = 0;
    if (d.key === 'online') {
      pts = (ptsByKey.fashion + ptsByKey.retail + ptsByKey.sports + ptsByKey.books) * months;
    } else {
      pts = ptsByKey[d.key] * months;
    }
    return { ...d, pts: Math.round(pts) };
  }).filter(s => s.pts > 0);

  const avgMonthly = ALL_SPEND_KEYS.reduce((s, k) => s + ptsForKey(k, MY_AVERAGE_SPEND[k] ?? 0), 0);

  return (
    <div className="step is-results">
      <div className="results-top">
        <button className="step-back" onClick={onRestart} aria-label="Start over">
          <RefreshCw size={18} />
        </button>
        <div className="results-eyebrow">Your Projection</div>
        <button className="step-back" aria-label="Share">
          <Share2 size={18} />
        </button>
      </div>

      <div className="results-body">
        <HeroResult totalPts={totalPts} period={period} />

        <div className="results-period-card">
          <span className="results-section-label">Period</span>
          <div className="period-toggle">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                className={period === p.key ? 'is-active' : ''}
                onClick={() => onPeriodChange(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {donutSlices.length > 0 && (
          <DonutBreakdown slices={donutSlices} totalPts={totalPts} period={period} />
        )}

        <Comparison userMonthly={monthly} avgMonthly={avgMonthly} period={period} />

        <Redemptions totalPts={totalPts} />

        <div className="results-cta">
          <button className="step-primary">
            Get the BonusLink app
            <ArrowRight size={16} />
          </button>
          <button className="step-skip" onClick={onRestart}>
            <RefreshCw size={14} /> Start over
          </button>
        </div>

        <p className="results-foot">
          Projection based on standard earn rates and the spend you entered. Real points may vary with partner promos and category bonus campaigns. 100 pts = RM1 standard redemption.
        </p>
      </div>
    </div>
  );
}
