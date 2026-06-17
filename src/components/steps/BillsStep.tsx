import { CreditCard } from 'lucide-react';
import { StepFrame } from '../StepFrame';
import { AmountInput } from '../AmountInput';
import { EarnPreview } from '../EarnPreview';
import { PRESETS } from '../../lib/data';
import { ptsForKey } from '../../lib/points';

interface Props {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BillsStep({ value, onChange, onNext, onBack }: Props) {
  const pts = ptsForKey('bills', value);
  return (
    <StepFrame
      questionIndex={4}
      onBack={onBack}
      icon={<CreditCard size={28} />}
      iconColor="var(--color-momentum)"
      iconTint="rgba(9,141,252,0.10)"
      category="Question 4 of 5 · Bills"
      title="Now the recurring bills."
      subtitle="Add up your monthly phone, electricity, internet and water — what's the total?"
      tip="TNB, Unifi, Astro, Indah Water — every ringgit earns 1 point."
      primary={{ label: 'Continue', onClick: onNext }}
      secondary={{ label: 'Skip', onClick: () => { onChange(0); onNext(); } }}
    >
      <AmountInput value={value} onChange={onChange} presets={PRESETS.bills} />
      <EarnPreview ptsPerMonth={pts} />
    </StepFrame>
  );
}
