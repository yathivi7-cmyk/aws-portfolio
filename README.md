# AWS Portfolio Champion

Welcome to the **AWS Portfolio Champion** monorepo.  This repository
showcases a full‑stack portfolio of projects that highlight expertise
across **Artificial Intelligence**, **Web Components**, **React**, and
**Serverless Backend** development.  Each project is designed as a
minimal but runnable example that can be extended into production
applications.  The repository uses **pnpm workspaces** to manage
multiple packages and applications in a single codebase.

## Repository Layout

```text
aws-portfolio/
├── apps/                   # Frontend applications
│   ├── react-finops-dashboard/      # React + Vite AWS cost dashboard
│   └── secure-ai-chat/              # Secure AI chat application
├── packages/               # Shared libraries
│   └── lit-insurance-ui/           # LitElement component library
├── services/               # Backend and infrastructure services
│   ├── bedrock-rag-advisor/        # Bedrock RAG pipeline with CDK infra
│   └── claims-pipeline/            # Insurance claims processing pipeline
├── .github/workflows/      # Continuous integration configuration
├── .eslintrc.json          # Base ESLint configuration
├── .prettierrc             # Prettier formatting configuration
├── package.json            # Monorepo root with workspace definitions
├── tsconfig.base.json      # Shared TypeScript configuration
└── README.md               # Project overview (this file)
```

## Getting Started

This monorepo is managed with **pnpm**.  To install dependencies and
bootstrap all packages, run the following commands from the root of the
repository:

```bash
# Install pnpm (if you don't have it installed globally)
npm install -g pnpm

# Install all dependencies in every workspace
pnpm install

# Run the linter, type checker and test runner across the repo
pnpm lint
pnpm typecheck
pnpm test
```

Each project has its own `README.md` with specific instructions for
running and deploying that service or application.

### Continuous Integration

The repository is configured with a GitHub Actions workflow located in
`.github/workflows/ci.yml`.  On every push or pull request to the
`main` branch, the workflow will install dependencies, run linting,
perform type checking and execute tests across all packages.  This
ensures that changes do not introduce syntax errors, type errors or
failing tests.

### Contributing

Contributions to the portfolio are welcome.  If you find an issue or
have an improvement, please open a pull request.  All contributions
should include appropriate tests and adhere to the coding standards
defined by ESLint and Prettier.
