# Lit Insurance UI

`lit-insurance-ui` is a small component library built with
[LitElement](https://lit.dev/) and designed for insurance and fintech
applications.  It demonstrates how to build accessible web components
with theming and composition using Lit.  The library includes a
button, an overlay modal and a policy card component.  Each component
is exported from `src/index.ts` and can be imported individually.

## Usage

Install the package locally by linking it via pnpm workspaces or
publishing it to a registry.  Then import the components in your
application:

```ts
import 'lit-insurance-ui/insurance-button';

function Example() {
  return html`<insurance-button label="Buy Policy"></insurance-button>`;
}
```

### Storybook

This package is configured with Storybook to preview the components.
To run Storybook locally:

```bash
pnpm install
pnpm --filter lit-insurance-ui run dev
```

This will start a Storybook server on port 6006.  The stories are
located in the `src/stories/` directory.

## Development

Run the TypeScript compiler and tests with the following commands:

```bash
pnpm --filter lit-insurance-ui run build   # Compile to dist
pnpm --filter lit-insurance-ui run test    # Run vitest
```

The compiled JavaScript and type definitions are emitted into the
`dist/` folder when building.
