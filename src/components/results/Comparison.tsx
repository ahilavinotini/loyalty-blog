import { Users } from 'lucide-react';
import { PERIODS, type PeriodKey } from '../../lib/data';
import { fmtNumber } from '../../lib/points';

interface Props {
  userMonthly: number;
  avgMonthly: number;
  period: PeriodKey;
}

export function Comparison({ userMonthly, avgMonthly, period }: Props) {
  const periodObj = PERIODS.find(p => p.key === period)!;
  const months = periodObj.months;
  const userPts = userMonthly * months;
  const avgPts = avgMonthly * months;
  const max = Math.max(userPts, avgPts) || 1;
  const diffPct = avgPts > 0 ? Math.round(((userPts - avgPts) / avgPts) * 100) : 0;
  const ahead = diffPct >= 0;

  return (
    <div className="compare-card">
      <div className="head">
        <div className="icon"><Users size={16} /></div>
        <h3>You vs the average Malaysian</h3>
      </div>
      <div className="compare-bars">
        <div className="compare-bar">
          <div className="top">
            <span className="who"><strong>You</strong></span>
            <span className="val">{fmtNumber(userPts)} pts</span>
          </div>
          <div className="track">
            <div className="fill you" style={{ width: `${(userPts / max) * 100}%` }} />
          </div>
        </div>
        <div className="compare-bar">
          <div className="top">
            <span className="who">Average member</span>
            <span className="val">{fmtNumber(avgPts)} pts</span>
          </div>
          <div className="track">
            <div className="fill avg" style={{ width: `${(avgPts / max) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="compare-foot">
        {ahead
          ? <>You're projected to earn <strong>{diffPct}% more</strong> than the average member over {periodObj.label}.</>
          : <>You're <strong>{Math.abs(diffPct)}% below</strong> the average. A few more everyday spends could change that.</>}
      </div>
    </div>
  );
}
