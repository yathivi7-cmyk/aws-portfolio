#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BedrockRagAdvisorStack } from '../lib/bedrock-rag-advisor-stack';

const app = new cdk.App();
new BedrockRagAdvisorStack(app, 'BedrockRagAdvisorStack', {});