import { useState, useEffect } from 'react';
import { WelcomeStep } from './components/steps/WelcomeStep';
import { FuelStep } from './components/steps/FuelStep';
import { GroceriesStep } from './components/steps/GroceriesStep';
import { OnlineStep } from './components/steps/OnlineStep';
import { BillsStep } from './components/steps/BillsStep';
import { TravelStep } from './components/steps/TravelStep';
import { ResultsScreen } from './components/results/ResultsScreen';
import {
  STEP_IDS, EMPTY_SPEND, MY_AVERAGE_SPEND,
  type StepId, type Spend, type PeriodKey, type OnlineSubKey,
} from './lib/data';

function stepIndex(id: StepId): number {
  return STEP_IDS.indexOf(id);
}

export default function App() {
  const [stepId, setStepId] = useState<StepId>('welcome');
  const [direction, setDirection] = useState<1 | -1>(1);
  const [spend, setSpend] = useState<Spend>({ ...EMPTY_SPEND });
  const [onlineSelected, setOnlineSelected] = useState<OnlineSubKey[]>(['retail', 'fashion']);
  const [onlineTotal, setOnlineTotal] = useState(0);
  const [period, setPeriod] = useState<PeriodKey>('1y');

  // Keep the four online sub-keys in sync with onlineTotal + selection
  useEffect(() => {
    const n = onlineSelected.length || 1;
    const share = onlineSelected.length > 0 ? onlineTotal / n : 0;
    setSpend(s => {
      const next = { ...s };
      (['fashion', 'retail', 'sports', 'books'] as OnlineSubKey[]).forEach(k => {
        next[k] = onlineSelected.includes(k) ? share : 0;
      });
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineTotal, onlineSelected.join(',')]);

  const goNext = () => {
    const idx = stepIndex(stepId);
    if (idx < STEP_IDS.length - 1) {
      setDirection(1);
      setStepId(STEP_IDS[idx + 1]);
    }
  };
  const goBack = () => {
    const idx = stepIndex(stepId);
    if (idx > 0) {
      setDirection(-1);
      setStepId(STEP_IDS[idx - 1]);
    }
  };
  const goTo = (id: StepId) => {
    setDirection(stepIndex(id) >= stepIndex(stepId) ? 1 : -1);
    setStepId(id);
  };

  const restart = () => {
    setSpend({ ...EMPTY_SPEND });
    setOnlineTotal(0);
    setOnlineSelected(['retail', 'fashion']);
    setPeriod('1y');
    setDirection(-1);
    setStepId('welcome');
  };

  const useAverages = () => {
    setSpend({ ...MY_AVERAGE_SPEND });
    const onlineSum = MY_AVERAGE_SPEND.fashion + MY_AVERAGE_SPEND.retail + MY_AVERAGE_SPEND.sports + MY_AVERAGE_SPEND.books;
    setOnlineTotal(onlineSum);
    setOnlineSelected(['retail', 'fashion', 'sports', 'books']);
    setPeriod('1y');
    setDirection(1);
    setStepId('results');
  };

  const setSpendKey = (key: keyof Spend) => (val: number) =>
    setSpend(s => ({ ...s, [key]: val }));

  const renderStep = () => {
    switch (stepId) {
      case 'welcome':
        return <WelcomeStep onStart={() => goTo('fuel')} onQuick={useAverages} />;
      case 'fuel':
        return <FuelStep value={spend.fuel} onChange={setSpendKey('fuel')} onNext={goNext} onBack={goBack} />;
      case 'groceries':
        return <GroceriesStep value={spend.groceries} onChange={setSpendKey('groceries')} onNext={goNext} onBack={goBack} />;
      case 'online':
        return (
          <OnlineStep
            total={onlineTotal}
            onTotalChange={setOnlineTotal}
            selected={onlineSelected}
            onSelectedChange={setOnlineSelected}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'bills':
        return <BillsStep value={spend.bills} onChange={setSpendKey('bills')} onNext={goNext} onBack={goBack} />;
      case 'travel':
        return <TravelStep value={spend.travel} onChange={setSpendKey('travel')} onNext={goNext} onBack={goBack} />;
      case 'results':
        return <ResultsScreen spend={spend} period={period} onPeriodChange={setPeriod} onRestart={restart} />;
      default:
        return null;
    }
  };

  return (
    <div className="shell is-desktop">
      {/* Desktop context panel */}
      <div className="desktop-flow">
        <div className="desktop-context">
          <div className="brandmark">
            <span className="mark-fill">
              <img src="/logomark.svg" alt="" />
            </span>
            <span className="wordmark">BonusLink</span>
          </div>
          <div className="desktop-context-eyebrow">Points calculator</div>
          <h2 className="desktop-context-title">A two-minute look at what you'd earn.</h2>
          <p className="desktop-context-sub">
            Five quick questions about your monthly habits. We'll project the BonusLink points you'd collect — and the ringgit value you could redeem.
          </p>
          <div className="desktop-context-meta">
            <div className="dcm-item">
              <span className="dcm-num">100<span>pts</span></span>
              <span className="dcm-lbl">= RM1 redemption</span>
            </div>
            <div className="dcm-item">
              <span className="dcm-num">2×<span>pts</span></span>
              <span className="dcm-lbl">on every travel ringgit</span>
            </div>
            <div className="dcm-item">
              <span className="dcm-num">1.5×<span>pts</span></span>
              <span className="dcm-lbl">on fuel above RM100</span>
            </div>
          </div>
        </div>

        <div className="desktop-flow-card">
          <div className={'step-stage dir-' + (direction > 0 ? 'fwd' : 'back')} key={stepId}>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
