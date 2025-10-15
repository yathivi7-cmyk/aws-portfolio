import { describe, it, expect } from 'vitest';
import { InsuranceButton } from './InsuranceButton';

describe('InsuranceButton', () => {
  it('has a default label', () => {
    const btn = new InsuranceButton();
    expect(btn.label).toBe('Click Me');
  });
});