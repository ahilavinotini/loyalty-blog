interface Props {
  value: number;
  onChange: (v: number) => void;
  presets: number[];
  autoFocus?: boolean;
}

export function AmountInput({ value, onChange, presets, autoFocus = true }: Props) {
  return (
    <>
      <div className="amount-row">
        <span className="amount-currency">RM</span>
        <input
          className="amount-input"
          type="text"
          inputMode="numeric"
          value={value === 0 ? '' : value}
          placeholder="0"
          autoFocus={autoFocus}
          onChange={(e) => {
            const v = e.target.value.replace(/[^0-9]/g, '');
            onChange(v === '' ? 0 : Math.min(99999, parseInt(v, 10)));
          }}
        />
        <span className="amount-suffix">/ month</span>
      </div>
      <div className="amount-presets">
        {presets.map((p) => (
          <button
            key={p}
            className={'preset' + (value === p ? ' is-active' : '')}
            onClick={() => onChange(p)}
          >
            RM{p.toLocaleString('en-MY')}
          </button>
        ))}
      </div>
    </>
  );
}
