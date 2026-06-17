import { ShoppingCart } from 'lucide-react';
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

export function GroceriesStep({ value, onChange, onNext, onBack }: Props) {
  const pts = ptsForKey('groceries', value);
  return (
    <StepFrame
      questionIndex={2}
      onBack={onBack}
      icon={<ShoppingCart size={28} />}
      iconColor="var(--color-success-dark)"
      iconTint="rgba(184,223,86,0.30)"
      category="Question 2 of 5 · Groceries"
      title="Onto your weekly shop."
      subtitle="What's a typical monthly grocery bill — Jaya Grocer, Cold Storage, Village Grocer and the rest?"
      tip="Every ringgit earns 1 point across all grocery partners."
      primary={{ label: 'Continue', onClick: onNext }}
      secondary={{ label: 'Skip', onClick: () => { onChange(0); onNext(); } }}
    >
      <AmountInput value={value} onChange={onChange} presets={PRESETS.groceries} />
      <EarnPreview ptsPerMonth={pts} />
    </StepFrame>
  );
}
