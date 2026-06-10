import { REDEMPTIONS } from '../../lib/data';
import { fmtNumber } from '../../lib/points';

interface Props { totalPts: number; }

export function Redemptions({ totalPts }: Props) {
  return (
    <div className="redeem-card">
      <div className="head">
        <h3>What you can redeem</h3>
        <span className="sub">Indicative</span>
      </div>
      <div className="redeem-list">
        {REDEMPTIONS.map((r) => {
          const canAfford = totalPts >= r.pts;
          const pct = Math.min(100, (totalPts / r.pts) * 100);
          const initials = r.merchant.slice(0, 2);
          return (
            <div className="redeem-item" key={r.merchant}>
              <div className="logo" style={{ background: r.accent }}>{initials}</div>
              <div className="info">
                <span className="merchant">{r.merchant}</span>
                <span className="reward">{r.reward}</span>
              </div>
              <div className="cost">
                <span className="pts">{fmtNumber(r.pts)} pts</span>
                <span className={'status ' + (canAfford ? 'ok' : 'no')}>
                  {canAfford ? 'Unlocked' : `${Math.round(pct)}%`}
                </span>
              </div>
              <div className="progress">
                <div className={'fill' + (canAfford ? ' full' : '')} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
