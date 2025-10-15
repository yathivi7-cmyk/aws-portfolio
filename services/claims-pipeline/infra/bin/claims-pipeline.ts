#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ClaimsPipelineStack } from '../lib/claims-pipeline-stack';

const app = new cdk.App();
new ClaimsPipelineStack(app, 'ClaimsPipelineStack', {});