import { BarChart2, Check } from 'lucide-react';
import { StepFrame } from '../StepFrame';
import { PERIODS, type PeriodKey } from '../../lib/data';

interface Props {
  value: PeriodKey;
  onChange: (v: PeriodKey) => void;
  onNext: () => void;
  onBack: () => void;
}

const PERIOD_LABELS: Record<PeriodKey, string> = {
  '1m': 'A quick taste',
  '6m': 'Mid-term view',
  '1y': 'Full annual payoff',
};

export function PeriodStep({ value, onChange, onNext, onBack }: Props) {
  return (
    <StepFrame
      questionIndex={6}
      onBack={onBack}
      icon={<BarChart2 size={28} />}
      iconColor="var(--color-navy)"
      iconTint="rgba(0,30,64,0.06)"
      category="Question 6 of 6 · Projection"
      title="How far ahead should we look?"
      subtitle="You can switch this on the results screen too."
      primary={{ label: 'See my results', onClick: onNext }}
    >
      <div className="period-cards">
        {PERIODS.map((p) => {
          const isOn = value === p.key;
          return (
            <button
              key={p.key}
              className={'period-card' + (isOn ? ' is-on' : '')}
              onClick={() => onChange(p.key)}
            >
              <div className="period-card-top">
                <span className="period-card-num">{p.months}</span>
                <span className="period-card-unit">{p.months === 1 ? 'month' : 'months'}</span>
              </div>
              <span className="period-card-label">{PERIOD_LABELS[p.key]}</span>
              <span className="period-card-check" aria-hidden="true">
                {isOn && <Check size={12} />}
              </span>
            </button>
          );
        })}
      </div>
    </StepFrame>
  );
}
