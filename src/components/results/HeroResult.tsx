import { useCountUp } from '../../hooks/useCountUp';
import { PERIODS, REDEMPTION_RATE, type PeriodKey } from '../../lib/data';
import { fmtNumber, fmtRM, fmtRMDecimal } from '../../lib/points';

interface Props {
  totalPts: number;
  period: PeriodKey;
}

export function HeroResult({ totalPts, period }: Props) {
  const periodObj = PERIODS.find(p => p.key === period)!;
  const rmValue = totalPts / REDEMPTION_RATE;
  const animPts = useCountUp(totalPts, 450);
  const animRM = useCountUp(rmValue, 450);

  const { whole, dec } = fmtRMDecimal(animRM);
  const perMonthRM = rmValue / periodObj.months;

  return (
    <div className="hero">
      <div className="row">
        <span className="label">Your projected earnings</span>
        <span className="period-tag">{periodObj.label}</span>
      </div>

      <div className="rm-amount">
        <span className="currency">RM</span>
        <span>{whole}</span>
        <span className="decimals">{dec}</span>
      </div>

      <div className="caption">
        in redeemable rewards — that's{' '}
        <strong style={{ color: 'var(--color-yellow)' }}>{fmtRM(perMonthRM)}</strong>{' '}
        every month back in your pocket.
      </div>

      <div className="pts-pill">
        <span className="dot" />
        {fmtNumber(animPts)} pts
      </div>

      <div className="hero-foot">
        <div className="stat">
          <span className="stat-val">{fmtNumber(totalPts / periodObj.months)} pts</span>
          <span className="stat-lbl">Earned each month</span>
        </div>
        <div className="stat">
          <span className="stat-val">100 pts = RM1</span>
          <span className="stat-lbl">Standard redemption</span>
        </div>
      </div>
    </div>
  );
}
