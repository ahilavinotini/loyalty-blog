import { Plane } from 'lucide-react';
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

export function TravelStep({ value, onChange, onNext, onBack }: Props) {
  const pts = ptsForKey('travel', value);
  return (
    <StepFrame
      questionIndex={5}
      onBack={onBack}
      icon={<Plane size={28} />}
      iconColor="var(--color-heritage)"
      iconTint="rgba(38,170,225,0.18)"
      category="Question 5 of 6 · Travel"
      title="Travel — last spend question."
      subtitle="Spread your year of flights and hotels into a monthly average. AirAsia, Agoda, Booking and Klook all count."
      tip="Travel earns 2 pts per ringgit — the highest rate in the programme."
      primary={{ label: 'Continue', onClick: onNext }}
      secondary={{ label: "I rarely travel", onClick: () => { onChange(0); onNext(); } }}
    >
      <AmountInput value={value} onChange={onChange} presets={PRESETS.travel} />
      <EarnPreview ptsPerMonth={pts} />
    </StepFrame>
  );
}
