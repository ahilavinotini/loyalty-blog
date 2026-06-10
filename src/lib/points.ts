import { EARN_RATES, REDEMPTION_RATE, ALL_SPEND_KEYS, PERIODS, type Spend, type SpendKey, type PeriodKey } from './data';

export function ptsForKey(key: SpendKey, monthlySpend: number): number {
  if (key === 'fuel') {
    const rate = EARN_RATES.fuel;
    return monthlySpend > (rate.threshold ?? 100)
      ? monthlySpend * (rate.bonus ?? 1.5)
      : monthlySpend * rate.base;
  }
  return monthlySpend * (EARN_RATES[key]?.base ?? 0);
}

export function monthlyTotal(spend: Spend): number {
  return ALL_SPEND_KEYS.reduce((sum, k) => sum + ptsForKey(k, spend[k] ?? 0), 0);
}

export function totalPts(spend: Spend, periodKey: PeriodKey): number {
  const period = PERIODS.find(p => p.key === periodKey)!;
  return Math.round(monthlyTotal(spend) * period.months);
}

export function redeemRM(pts: number): number {
  return pts / REDEMPTION_RATE;
}

export function fmtNumber(n: number): string {
  return Math.max(0, Math.round(n)).toLocaleString('en-MY');
}

export function fmtRM(n: number): string {
  if (!isFinite(n)) return 'RM0';
  return 'RM' + Math.floor(n).toLocaleString('en-MY');
}

export function fmtRMDecimal(n: number): { whole: string; dec: string } {
  if (!isFinite(n)) return { whole: '0', dec: '.00' };
  const cents = Math.round(n * 100);
  const whole = Math.floor(cents / 100).toLocaleString('en-MY');
  const dec = '.' + String(cents % 100).padStart(2, '0');
  return { whole, dec };
}
