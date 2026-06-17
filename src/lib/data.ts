export type SpendKey = 'fuel' | 'groceries' | 'fashion' | 'retail' | 'sports' | 'books' | 'bills' | 'travel';
export type PeriodKey = '1m' | '6m' | '1y';
export type OnlineSubKey = 'fashion' | 'retail' | 'sports' | 'books';

export interface EarnRate {
  base: number;
  bonus?: number;
  threshold?: number;
  label: string;
  bonusLabel?: string;
}

export const EARN_RATES: Record<SpendKey, EarnRate> = {
  fuel:      { base: 1.0, bonus: 1.5, threshold: 100, label: 'RM1 = 1 pt', bonusLabel: 'RM1 = 1.5 pts above RM100' },
  groceries: { base: 1.0, label: 'RM1 = 1 pt' },
  fashion:   { base: 1.0, label: 'RM1 = 1 pt' },
  retail:    { base: 1.0, label: 'RM1 = 1 pt' },
  sports:    { base: 1.0, label: 'RM1 = 1 pt' },
  books:     { base: 1.0, label: 'RM1 = 1 pt' },
  bills:     { base: 1.0, label: 'RM1 = 1 pt' },
  travel:    { base: 2.0, label: 'RM1 = 2 pts' },
};

export const REDEMPTION_RATE = 100; // points per RM1

export const MY_AVERAGE_SPEND: Record<SpendKey, number> = {
  fuel: 220,
  groceries: 480,
  fashion: 65,
  retail: 90,
  sports: 35,
  books: 25,
  bills: 380,
  travel: 110,
};

export const PRESETS: Record<string, number[]> = {
  fuel:      [100, 250, 500],
  groceries: [200, 600, 1200],
  fashion:   [50, 200, 500],
  retail:    [50, 200, 500],
  sports:    [50, 150, 400],
  books:     [30, 100, 250],
  bills:     [150, 400, 800],
  travel:    [100, 500, 1500],
};

export interface Period {
  key: PeriodKey;
  label: string;
  months: number;
}

export const PERIODS: Period[] = [
  { key: '1m', label: '1 month',  months: 1 },
  { key: '6m', label: '6 months', months: 6 },
  { key: '1y', label: '1 year',   months: 12 },
];

export interface Redemption {
  merchant: string;
  reward: string;
  pts: number;
  accent: string;
}

export const REDEMPTIONS: Redemption[] = [
  { merchant: 'Shell',         reward: 'RM 50 fuel voucher',          pts: 5000,  accent: '#E3000F' },
  { merchant: 'Shopee',        reward: 'RM 20 cashback voucher',      pts: 2000,  accent: '#EE4D2D' },
  { merchant: 'Baskin Robbins',reward: 'Ice cream voucher',           pts: 1500,  accent: '#E8174B' },
  { merchant: 'Anker',         reward: 'PowerCore 10K power bank',    pts: 8000,  accent: '#1A73E8' },
  { merchant: 'AirAsia',       reward: 'RM 100 BIG flight credit',    pts: 10000, accent: '#D90A1D' },
];

export const ALL_SPEND_KEYS: SpendKey[] = ['fuel', 'groceries', 'fashion', 'retail', 'sports', 'books', 'bills', 'travel'];

export const ONLINE_SUB_KEYS: OnlineSubKey[] = ['retail', 'fashion', 'sports', 'books'];

export const STEP_IDS = ['welcome', 'fuel', 'groceries', 'online', 'bills', 'travel', 'results'] as const;
export type StepId = typeof STEP_IDS[number];

export interface OnlineCat {
  key: OnlineSubKey;
  name: string;
  color: string;
  tint: string;
}

export const ONLINE_CATS: OnlineCat[] = [
  { key: 'retail',  name: 'Retail',  color: 'var(--color-momentum)', tint: 'rgba(9,141,252,0.12)' },
  { key: 'fashion', name: 'Fashion', color: 'var(--color-rose)',     tint: 'rgba(235,134,191,0.18)' },
  { key: 'sports',  name: 'Sports',  color: 'var(--color-lime)',     tint: 'rgba(184,223,86,0.30)' },
  { key: 'books',   name: 'Books',   color: 'var(--color-violet)',   tint: 'rgba(167,117,228,0.16)' },
];

export type Spend = Record<SpendKey, number>;

export const EMPTY_SPEND: Spend = {
  fuel: 0, groceries: 0, fashion: 0, retail: 0,
  sports: 0, books: 0, bills: 0, travel: 0,
};
