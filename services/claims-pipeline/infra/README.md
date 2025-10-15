# Infrastructure for Claims Pipeline

The CDK application in this directory provisions all AWS resources
needed for the claims pipeline service.  It creates:

- A DynamoDB table to store claims.
- Two Lambda functions: `createClaim` and `processClaim`, built from
  compiled code in the service's `dist/functions` directory.
- A Step Functions state machine that orchestrates the pipeline by
  invoking the Lambdas in sequence.

To deploy the stack, compile the TypeScript first and then run
`cdk deploy` from this directory.  Make sure your AWS credentials are
configured appropriately.
