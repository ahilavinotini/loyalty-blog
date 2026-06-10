import { useCountUp } from '../hooks/useCountUp';
import { REDEMPTION_RATE } from '../lib/data';
import { fmtNumber, fmtRM } from '../lib/points';

interface Props {
  ptsPerMonth: number;
}

export function EarnPreview({ ptsPerMonth }: Props) {
  const animPts = useCountUp(ptsPerMonth, 350);
  const rm = ptsPerMonth / REDEMPTION_RATE;

  return (
    <div className="earn-preview">
      <div className="earn-row">
        <span className="earn-label">Earns each month</span>
        <div className="earn-pill">
          <span className="earn-dot" />
          <span className="earn-num">{fmtNumber(animPts)}</span>
          <span className="earn-unit">pts</span>
        </div>
      </div>
      <div className="earn-row">
        <span className="earn-label" style={{ color: 'var(--color-text-tertiary)' }}>Redeem value</span>
        <span className="earn-rm">
          ≈ {fmtRM(rm)}
          <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 500 }}> / mo</span>
        </span>
      </div>
    </div>
  );
}
