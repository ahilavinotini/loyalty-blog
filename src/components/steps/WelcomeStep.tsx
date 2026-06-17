import { ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
  onQuick: () => void;
}

export function WelcomeStep({ onStart, onQuick }: Props) {
  return (
    <div className="step is-welcome">
      <div className="welcome-glow" />
      <div className="welcome-mark">
        <div className="welcome-mark-ring" />
        <div className="welcome-mark-inner">
          <img src="/logomark.svg" alt="BonusLink" />
        </div>
      </div>

      <div className="welcome-body">
        <div className="welcome-eyebrow">Points Calculator</div>
        <h1 className="welcome-title">
          See what your everyday spend <em>really</em> earns.
        </h1>
        <p className="welcome-sub">
          Five quick questions about your monthly habits. We'll project the BonusLink points you'd collect — and the ringgit value you could redeem.
        </p>
        <div className="welcome-meta">
          <span><strong>6</strong> questions</span>
          <span className="welcome-meta-sep" />
          <span><strong>~60</strong> seconds</span>
        </div>
      </div>

      <div className="welcome-foot">
        <button className="step-primary welcome-primary" onClick={onStart}>
          Get started
          <ArrowRight size={16} />
        </button>
        <button className="welcome-quick" onClick={onQuick}>
          Show me average values instead
        </button>
      </div>
    </div>
  );
}
