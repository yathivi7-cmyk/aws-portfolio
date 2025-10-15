import { describe, it, expect } from 'vitest';
import { isAllowedMessage } from '../src/server/guardrails';

describe('isAllowedMessage', () => {
  it('returns true for safe messages', () => {
    expect(isAllowedMessage('Hello there')).toBe(true);
  });
  it('returns false for messages containing banned words', () => {
    expect(isAllowedMessage('This is a malicious input')).toBe(false);
  });
});