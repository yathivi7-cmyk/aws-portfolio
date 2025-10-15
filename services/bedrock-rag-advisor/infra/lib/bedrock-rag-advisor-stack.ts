import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import * as path from 'path';

/**
 * A CDK stack that provisions the infrastructure for the Bedrock RAG
 * advisor service.  It creates an S3 bucket, an OpenSearch domain and
 * a Lambda function which runs the RAG logic.
 */
export class BedrockRagAdvisorStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3 bucket to hold ingested documents
    const bucket = new s3.Bucket(this, 'DocumentsBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // OpenSearch domain for vector search
    const domain = new opensearch.Domain(this, 'OpenSearchDomain', {
      version: opensearch.EngineVersion.OPENSEARCH_2_5,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Lambda function that runs the RAG logic.  The code is built
    // from the compiled output of the service's src folder.
    const ragFunction = new lambda.Function(this, 'RagHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),
      environment: {
        OPENSEARCH_ENDPOINT: domain.domainEndpoint,
        BUCKET_NAME: bucket.bucketName,
      },
      timeout: Duration.seconds(30),
    });

    // Grant the Lambda function permissions to read from the bucket and
    // search the OpenSearch domain.
    bucket.grantRead(ragFunction);
    domain.grantRead(ragFunction);
  }
}