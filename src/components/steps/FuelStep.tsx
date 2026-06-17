import { Fuel } from 'lucide-react';
import { StepFrame } from '../StepFrame';
import { AmountInput } from '../AmountInput';
import { EarnPreview } from '../EarnPreview';
import { PRESETS, EARN_RATES } from '../../lib/data';
import { ptsForKey } from '../../lib/points';

interface Props {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}

function FuelMiniTier({ value }: { value: number }) {
  const threshold = EARN_RATES.fuel.threshold ?? 100;
  const pct = Math.min(100, (value / threshold) * 100);
  const unlocked = value > threshold;
  return (
    <div className={'mini-tier' + (unlocked ? ' is-unlocked' : '')}>
      <div className="mini-tier-bar">
        <div className="mini-tier-fill" style={{ width: (unlocked ? 100 : pct) + '%' }} />
        <span className="mini-tier-marker" style={{ left: '100%' }} />
      </div>
      <div className="mini-tier-legend">
        <span>Standard 1× pts</span>
        <span className="mini-tier-thr">RM100</span>
        <span className={unlocked ? 'is-active' : ''}>Bonus 1.5× pts</span>
      </div>
    </div>
  );
}

export function FuelStep({ value, onChange, onNext, onBack }: Props) {
  const pts = ptsForKey('fuel', value);
  const unlocked = value > (EARN_RATES.fuel.threshold ?? 100);
  return (
    <StepFrame
      questionIndex={1}
      onBack={onBack}
      icon={<Fuel size={28} />}
      iconColor="var(--color-amber)"
      iconTint="rgba(255,158,48,0.16)"
      category="Question 1 of 5 · Fuel"
      title="Let's start at the pump."
      subtitle="Roughly how much do you spend on fuel each month? Petronas, Shell and Caltex all count."
      tip={unlocked
        ? 'Bonus tier unlocked — every ringgit now earns 1.5 pts.'
        : 'Spend more than RM100 and your earn rate jumps to 1.5× — automatically.'}
      primary={{ label: 'Continue', onClick: onNext }}
      secondary={{ label: "I don't drive", onClick: () => { onChange(0); onNext(); } }}
      tertiary={{ label: "I drive EV", onClick: () => { onChange(0); onNext(); } }}
    >
      <AmountInput value={value} onChange={onChange} presets={PRESETS.fuel} />
      <EarnPreview ptsPerMonth={pts} />
      <FuelMiniTier value={value} />
    </StepFrame>
  );
}
