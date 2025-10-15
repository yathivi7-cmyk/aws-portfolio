import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

interface ProcessEvent {
  claimId: string;
}

/**
 * Lambda handler to process an insurance claim.  Updates the claim
 * status in DynamoDB to `PROCESSED` and returns the updated status.
 */
export const handler = async (event: ProcessEvent): Promise<{ claimId: string; status: string }> => {
  const client = new DynamoDBClient({});
  const tableName = process.env.TABLE_NAME;
  if (!tableName) {
    throw new Error('TABLE_NAME environment variable must be defined');
  }
  await client.send(
    new UpdateItemCommand({
      TableName: tableName,
      Key: { id: { S: event.claimId } },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': { S: 'PROCESSED' } },
    }),
  );
  return { claimId: event.claimId, status: 'PROCESSED' };
};