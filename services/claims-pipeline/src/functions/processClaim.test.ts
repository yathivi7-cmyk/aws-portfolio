import { describe, it, expect, vi } from 'vitest';
import { handler } from './processClaim';

vi.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: class {},
    UpdateItemCommand: class {},
  };
});

describe('processClaim handler', () => {
  it('updates the claim status to PROCESSED', async () => {
    process.env.TABLE_NAME = 'Claims';
    const result = await handler({ claimId: 'abc123' });
    expect(result).toEqual({ claimId: 'abc123', status: 'PROCESSED' });
  });
});