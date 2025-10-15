import { describe, it, expect, vi } from 'vitest';
import { handler } from './createClaim';

vi.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: class {},
    PutItemCommand: class {},
  };
});

vi.mock('uuid', () => {
  return { v4: () => 'test-id' };
});

describe('createClaim handler', () => {
  it('returns an object containing claimId', async () => {
    process.env.TABLE_NAME = 'Claims';
    const result = await handler();
    expect(result).toEqual({ claimId: 'test-id' });
  });
});