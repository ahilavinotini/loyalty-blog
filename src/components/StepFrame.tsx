import { type ReactNode } from 'react';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';

const NUM_QUESTIONS = 5;

interface PrimaryAction { label: string; onClick: () => void; disabled?: boolean; }
interface SecondaryAction { label: string; onClick: () => void; }

interface Props {
  questionIndex?: number;
  onBack?: () => void;
  icon?: ReactNode;
  iconColor?: string;
  iconTint?: string;
  category?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  tip?: string;
  primary?: PrimaryAction;
  secondary?: SecondaryAction;
  tertiary?: SecondaryAction;
  className?: string;
}

export function StepFrame({
  questionIndex, onBack, icon, iconColor, iconTint,
  category, title, subtitle, children, tip,
  primary, secondary, tertiary, className = '',
}: Props) {
  return (
    <div className={'step ' + className}>
      <div className="step-head">
        {onBack ? (
          <button className="step-back" onClick={onBack} aria-label="Back">
            <ChevronLeft size={20} />
          </button>
        ) : (
          <span className="step-back-placeholder" />
        )}
        {questionIndex != null && (
          <div className="step-progress" aria-label={`Question ${questionIndex} of ${NUM_QUESTIONS}`}>
            {Array.from({ length: NUM_QUESTIONS }).map((_, i) => (
              <span
                key={i}
                className={
                  'dot' +
                  (i < questionIndex - 1 ? ' is-done' : '') +
                  (i === questionIndex - 1 ? ' is-active' : '')
                }
              />
            ))}
          </div>
        )}
        <span className="step-back-placeholder" />
      </div>

      <div className="step-body">
        {icon && (
          <div className="step-icon" style={{ background: iconTint, color: iconColor }}>
            {icon}
          </div>
        )}
        {category && <div className="step-eyebrow">{category}</div>}
        <h1 className="step-title">{title}</h1>
        {subtitle && <p className="step-subtitle">{subtitle}</p>}

        <div className="step-input">{children}</div>

        {tip && (
          <div className="step-tip">
            <span className="step-tip-spark"><Sparkles size={12} /></span>
            <span>{tip}</span>
          </div>
        )}
      </div>

      <div className="step-foot">
        {(secondary || tertiary) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {secondary && (
              <button className="step-skip" onClick={secondary.onClick}>{secondary.label}</button>
            )}
            {tertiary && (
              <button className="step-skip" onClick={tertiary.onClick}>{tertiary.label}</button>
            )}
          </div>
        )}
        {primary && (
          <button
            className={'step-primary' + (primary.disabled ? ' is-disabled' : '')}
            onClick={primary.disabled ? undefined : primary.onClick}
          >
            {primary.label}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
