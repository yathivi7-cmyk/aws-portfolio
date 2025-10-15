import { describe, it, expect } from 'vitest';
import { fetchCostData } from './costExplorer';

describe('fetchCostData', () => {
  it('returns labels and values arrays', async () => {
    const result = await fetchCostData();
    expect(Array.isArray(result.labels)).toBe(true);
    expect(Array.isArray(result.values)).toBe(true);
    expect(result.labels.length).toBe(result.values.length);
  });
});