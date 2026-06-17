import React from 'react';
import { ShoppingBag, Shirt, Globe, BookOpen, Check } from 'lucide-react';
import { StepFrame } from '../StepFrame';
import { AmountInput } from '../AmountInput';
import { EarnPreview } from '../EarnPreview';
import { PRESETS, ONLINE_CATS, type OnlineSubKey } from '../../lib/data';

const CAT_ICONS: Record<OnlineSubKey, React.ReactElement> = {
  retail:  <ShoppingBag size={16} />,
  fashion: <Shirt size={16} />,
  sports:  <Globe size={16} />,
  books:   <BookOpen size={16} />,
};

interface Props {
  total: number;
  onTotalChange: (v: number) => void;
  selected: OnlineSubKey[];
  onSelectedChange: (v: OnlineSubKey[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnlineStep({ total, onTotalChange, selected, onSelectedChange, onNext, onBack }: Props) {
  const pts = total * 1.0;
  const noneSelected = selected.length === 0;

  return (
    <StepFrame
      questionIndex={3}
      onBack={onBack}
      icon={<ShoppingBag size={28} />}
      iconColor="var(--color-violet)"
      iconTint="rgba(167,117,228,0.16)"
      category="Question 3 of 5 · Online shopping"
      title="What do you shop online?"
      subtitle="Pick the categories that match your habits, then tell us your typical monthly total."
      tip="Shopee, Lazada, Zalora — RM1 earns 1 pt across all online partners."
      primary={{
        label: 'Continue',
        onClick: onNext,
        disabled: total > 0 && noneSelected,
      }}
      secondary={{ label: "Don't shop online", onClick: () => { onTotalChange(0); onSelectedChange([]); onNext(); } }}
    >
      <div className="cat-chips">
        {ONLINE_CATS.map((c) => {
          const isOn = selected.includes(c.key);
          return (
            <button
              key={c.key}
              className={'cat-chip' + (isOn ? ' is-on' : '')}
              style={isOn ? { background: c.tint, color: c.color, borderColor: c.color } : undefined}
              onClick={() => {
                if (isOn) onSelectedChange(selected.filter(k => k !== c.key));
                else onSelectedChange([...selected, c.key]);
              }}
            >
              <span className="cat-chip-icon">{CAT_ICONS[c.key]}</span>
              <span>{c.name}</span>
              <span className="cat-chip-tick" aria-hidden="true">
                {isOn && <Check size={12} />}
              </span>
            </button>
          );
        })}
      </div>
      <div className="cat-chips-hint">
        {selected.length === 0
          ? 'Pick at least one category'
          : selected.length === 4
            ? 'All four selected'
            : `${selected.length} of 4 selected`}
      </div>

      <div className="step-divider" />

      <AmountInput value={total} onChange={onTotalChange} presets={PRESETS.fashion} />
      <EarnPreview ptsPerMonth={pts} />
    </StepFrame>
  );
}
