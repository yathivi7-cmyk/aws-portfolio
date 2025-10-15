import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

/**
 * Lambda handler to create a new insurance claim.  Generates a
 * unique identifier, writes the claim into DynamoDB and returns the
 * claim ID to the caller.  The DynamoDB table name is provided
 * via the `TABLE_NAME` environment variable.
 */
export const handler = async (): Promise<{ claimId: string }> => {
  const client = new DynamoDBClient({});
  const claimId = uuidv4();
  const tableName = process.env.TABLE_NAME;
  if (!tableName) {
    throw new Error('TABLE_NAME environment variable must be defined');
  }
  const params = {
    TableName: tableName,
    Item: {
      id: { S: claimId },
      status: { S: 'NEW' },
      timestamp: { S: new Date().toISOString() },
    },
  };
  await client.send(new PutItemCommand(params));
  return { claimId };
};