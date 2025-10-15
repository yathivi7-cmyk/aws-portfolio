# Bedrock RAG Advisor Service

This service implements a minimal Retrieval‑Augmented Generation (RAG)
pipeline using AWS Bedrock.  It demonstrates how to ingest
documents into an OpenSearch index, retrieve relevant content for a
user query, and send a composed prompt to a large language model via
Bedrock.  An accompanying CDK stack provisions the required
infrastructure: an S3 bucket for document storage, an OpenSearch
domain for vector search, and a Lambda function that runs the RAG
logic.

## Running Locally

The RAG logic is implemented in `src/index.ts`.  To run the handler
locally, install dependencies and execute the file with ts-node:

```bash
pnpm install
pnpm --filter bedrock-rag-advisor run build
node dist/index.js
```

The function expects an event with a `query` property.  When deployed
to AWS Lambda, the handler will receive the query from API Gateway or
another service.  The code uses the AWS SDK clients for OpenSearch and
Bedrock Runtime to search documents and invoke the language model.

## Deploying with CDK

The `infra/` directory contains an AWS CDK stack that provisions the
infrastructure required by this service.  Before deploying, make sure
you have bootstrapped your AWS environment for CDK and configured your
AWS credentials.  Then run:

```bash
pnpm --filter bedrock-rag-advisor run build
pnpm --filter bedrock-rag-advisor run deploy
```

This will synthesize and deploy the stack defined in
`infra/lib/bedrock-rag-advisor-stack.ts`.  The stack creates an S3
bucket, an OpenSearch domain, and a Lambda function built from the
compiled TypeScript in the `dist` folder.  The Lambda function has
permissions to read from the bucket and search the OpenSearch domain.
