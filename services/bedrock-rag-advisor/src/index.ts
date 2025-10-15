import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { OpenSearchClient, SearchCommand } from '@aws-sdk/client-opensearch';

interface RagEvent {
  query: string;
}

/**
 * Handler function for the Bedrock RAG advisor.
 *
 * Given a query, this function performs a search against an
 * OpenSearch index and then invokes a Bedrock model with a
 * prompt that includes the retrieved documents.  The response
 * from the model is returned to the caller.  This example uses
 * dummy search results and does not require a running OpenSearch
 * domain or Bedrock model to execute locally.
 */
export const handler = async (event: RagEvent) => {
  const query = event.query;

  // Search for relevant documents in OpenSearch
  const openSearch = new OpenSearchClient({});
  const searchResponse = await openSearch.send(
    new SearchCommand({ index: 'documents', q: query }),
  );
  const hits = (searchResponse as any).hits?.hits || [];
  const documents: string = hits
    .map((hit: any) => hit._source?.content)
    .filter(Boolean)
    .join('\n');

  // Compose a prompt for the language model
  const prompt = `Use the following documents to answer the question:\n${documents}\nQuestion: ${query}`;

  // Invoke the Bedrock model
  const bedrock = new BedrockRuntimeClient({});
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-v2',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({ prompt, max_tokens: 500 }),
  });
  const response = await bedrock.send(command);
  const responseString = new TextDecoder().decode(response.body as any);
  return {
    answer: JSON.parse(responseString),
  };
};