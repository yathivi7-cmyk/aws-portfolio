# Infrastructure for Bedrock RAG Advisor

This folder contains an AWS CDK application that provisions the
infrastructure required by the Bedrock RAG advisor service.  The
stack creates the following resources:

- An S3 bucket to store documents and ingestion artifacts.
- An OpenSearch domain to host vector indexes used for retrieval.
- A Lambda function that runs the RAG logic compiled from
  `services/bedrock-rag-advisor/src/index.ts`.

To deploy the infrastructure, run the following commands from the root
of the repository (make sure your AWS credentials are configured):

```bash
pnpm --filter bedrock-rag-advisor run build
pnpm --filter bedrock-rag-advisor run deploy
```

This will synthesize and deploy the stack defined in
`lib/bedrock-rag-advisor-stack.ts`.  The Lambda function is built from
the compiled JavaScript in `../dist`.
