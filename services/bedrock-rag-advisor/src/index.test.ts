import { describe, it, expect, vi } from 'vitest';
import { handler } from './index';

// Mock the AWS SDK clients to avoid real network calls.
vi.mock('@aws-sdk/client-opensearch', () => {
  return {
    OpenSearchClient: class {
      send = vi.fn().mockResolvedValue({
        hits: { hits: [{ _source: { content: 'doc1' } }] },
      });
    },
    SearchCommand: class {},
  };
});

vi.mock('@aws-sdk/client-bedrock-runtime', () => {
  return {
    BedrockRuntimeClient: class {
      send = vi.fn().mockResolvedValue({
        body: Buffer.from(JSON.stringify('response')), // simulate JSON string body
      });
    },
    InvokeModelCommand: class {},
  };
});

describe('bedrock-rag-advisor handler', () => {
  it('returns an answer property', async () => {
    const result = await handler({ query: 'test' });
    expect(result).toHaveProperty('answer');
  });
});