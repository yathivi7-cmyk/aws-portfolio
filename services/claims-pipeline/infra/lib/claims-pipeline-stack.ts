import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as path from 'path';

/**
 * CDK stack that provisions resources for the claims pipeline.
 */
export class ClaimsPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB table to hold claims
    const table = new dynamodb.Table(this, 'ClaimsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Lambda function to create a claim
    const createClaimFn = new lambda.Function(this, 'CreateClaimFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'createClaim.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist/functions')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Lambda function to process a claim
    const processClaimFn = new lambda.Function(this, 'ProcessClaimFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'processClaim.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist/functions')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant read/write permissions on the table to the functions
    table.grantWriteData(createClaimFn);
    table.grantReadWriteData(processClaimFn);

    // Step Functions tasks to invoke the Lambdas
    const createTask = new tasks.LambdaInvoke(this, 'CreateClaimTask', {
      lambdaFunction: createClaimFn,
      outputPath: '$.Payload',
    });

    const processTask = new tasks.LambdaInvoke(this, 'ProcessClaimTask', {
      lambdaFunction: processClaimFn,
      inputPath: '$',
      outputPath: '$.Payload',
    });

    // Define the state machine: create -> process
    const definition = createTask.next(processTask);

    new stepfunctions.StateMachine(this, 'ClaimsStateMachine', {
      definition,
      timeout: Duration.minutes(5),
    });
  }
}