import { describe, it, expect } from 'vitest';
import { ptsForKey, monthlyTotal, totalPts, redeemRM } from './points';
import { EMPTY_SPEND } from './data';

describe('ptsForKey', () => {
  it('fuel below threshold earns 1×', () => {
    expect(ptsForKey('fuel', 100)).toBe(100);   // exactly at threshold → not above → 1×
    expect(ptsForKey('fuel', 99)).toBe(99);
    expect(ptsForKey('fuel', 0)).toBe(0);
  });

  it('fuel above threshold earns 1.5× on whole amount', () => {
    expect(ptsForKey('fuel', 101)).toBe(151.5);
    expect(ptsForKey('fuel', 250)).toBe(375);
    expect(ptsForKey('fuel', 500)).toBe(750);
  });

  it('groceries earn 1× flat', () => {
    expect(ptsForKey('groceries', 200)).toBe(200);
    expect(ptsForKey('groceries', 0)).toBe(0);
  });

  it('travel earns 2× flat', () => {
    expect(ptsForKey('travel', 100)).toBe(200);
    expect(ptsForKey('travel', 500)).toBe(1000);
  });

  it('bills earn 1× flat', () => {
    expect(ptsForKey('bills', 400)).toBe(400);
  });

  it('online sub-cats earn 1× flat', () => {
    expect(ptsForKey('fashion', 50)).toBe(50);
    expect(ptsForKey('retail', 200)).toBe(200);
    expect(ptsForKey('sports', 150)).toBe(150);
    expect(ptsForKey('books', 30)).toBe(30);
  });
});

describe('monthlyTotal', () => {
  it('zero spend = zero points', () => {
    expect(monthlyTotal(EMPTY_SPEND)).toBe(0);
  });

  it('sums correctly across all categories', () => {
    const spend = { ...EMPTY_SPEND, fuel: 250, groceries: 200, travel: 100 };
    // fuel 250 > 100 → 250 * 1.5 = 375; groceries 200; travel 100 * 2 = 200
    expect(monthlyTotal(spend)).toBe(375 + 200 + 200);
  });
});

describe('totalPts', () => {
  it('multiplies by period months and rounds', () => {
    const spend = { ...EMPTY_SPEND, groceries: 100 };
    expect(totalPts(spend, '1m')).toBe(100);
    expect(totalPts(spend, '6m')).toBe(600);
    expect(totalPts(spend, '1y')).toBe(1200);
  });
});

describe('redeemRM', () => {
  it('100 pts = RM1', () => {
    expect(redeemRM(100)).toBe(1);
    expect(redeemRM(500)).toBe(5);
    expect(redeemRM(10000)).toBe(100);
  });
});
