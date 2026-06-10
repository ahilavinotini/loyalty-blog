import { useCountUp } from '../../hooks/useCountUp';
import { PERIODS, type PeriodKey } from '../../lib/data';
import { fmtNumber } from '../../lib/points';

interface Slice { key: string; name: string; color: string; pts: number; }

interface Props {
  slices: Slice[];
  totalPts: number;
  period: PeriodKey;
}

export function DonutBreakdown({ slices, totalPts, period }: Props) {
  const periodObj = PERIODS.find(p => p.key === period)!;
  const total = slices.reduce((s, x) => s + x.pts, 0) || 1;
  const animTotal = useCountUp(totalPts, 450);

  const r = 56, cx = 70, cy = 70, sw = 14;
  const C = 2 * Math.PI * r;

  let acc = 0;
  const arcs = slices.map((s) => {
    if (s.pts <= 0) return null;
    const portion = s.pts / total;
    const len = portion * C;
    const offset = -acc * C;
    acc += portion;
    return { ...s, len, offset };
  }).filter(Boolean) as (Slice & { len: number; offset: number })[];

  return (
    <div className="donut-card">
      <div className="head">
        <h3>Where your points come from</h3>
        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{periodObj.label}</span>
      </div>
      <div className="body">
        <div className="donut-wrap">
          <svg viewBox="0 0 140 140">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,30,64,0.06)" strokeWidth={sw} />
            {arcs.map((s) => (
              <circle
                key={s.key}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={sw}
                strokeDasharray={`${s.len} ${C}`}
                strokeDashoffset={s.offset}
                strokeLinecap="butt"
                style={{ transition: 'stroke-dasharray 400ms cubic-bezier(0.2,0.8,0.2,1), stroke-dashoffset 400ms cubic-bezier(0.2,0.8,0.2,1)' }}
              />
            ))}
          </svg>
          <div className="donut-center">
            <span className="num">{fmtNumber(animTotal)}</span>
            <span className="lbl">Total pts</span>
          </div>
        </div>
        <div className="donut-legend">
          {slices.map((s) => {
            const pct = (s.pts / total) * 100;
            return (
              <div className="lg-row" key={s.key}>
                <span className="lg-dot" style={{ background: s.color }} />
                <span className="lg-name">{s.name}</span>
                <span className="lg-val">{fmtNumber(s.pts)}</span>
                <span className="lg-pct">{Math.round(pct)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
