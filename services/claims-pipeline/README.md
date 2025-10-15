# Claims Pipeline Service

This service implements a simple, event‑driven backend for
processing insurance claims.  It demonstrates how to orchestrate
multiple AWS Lambda functions using Step Functions and DynamoDB.

## Overview

When a new claim is created via the `createClaim` Lambda function, the
claim record is written to a DynamoDB table and then fed into a Step
Function state machine.  The state machine invokes the
`processClaim` function, which updates the claim status to
`PROCESSED`.  This pattern illustrates how to build fault‑tolerant
pipelines with retries, structured logging and eventual
consistency.

## Running Locally

The functions in `src/functions` are standard Node.js modules and can
be executed locally for development.  To build the TypeScript and run
tests:

```bash
pnpm install
pnpm --filter claims-pipeline run build
pnpm --filter claims-pipeline run test
```

## Deploying

The infrastructure for this service is defined using AWS CDK in the
`infra/` directory.  To deploy the stack, first compile the
application code and then run the deploy script:

```bash
pnpm --filter claims-pipeline run build
pnpm --filter claims-pipeline run deploy
```

This creates a DynamoDB table, two Lambda functions, a Step Function
state machine and the necessary IAM permissions.
