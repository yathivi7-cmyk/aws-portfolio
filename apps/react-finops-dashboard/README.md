# React FinOps Dashboard

This is a minimal dashboard application built with **React** and
**Vite** that visualises AWS Cost Explorer data.  The purpose of
this app is to demonstrate a modern React architecture using hooks,
context and charting libraries, while keeping the example light
enough to run out of the box.  The dashboard fetches cost data from a
backend API (represented here by a mocked function) and renders it
with Chart.js via the `react-chartjs-2` wrapper.

## Running the App

Install dependencies and start the development server:

```bash
pnpm install
pnpm --filter react-finops-dashboard run dev
```

The app will be available at <http://localhost:3000>.  To build the
production version, run:

```bash
pnpm --filter react-finops-dashboard run build
```

This will output static files into the `dist/` directory.

## Project Structure

```text
react-finops-dashboard/
├── src/
│   ├── api/              # Backend API interface
│   │   └── costExplorer.ts
│   ├── components/       # React components
│   │   └── CostChart.tsx
│   ├── App.tsx           # Main application component
│   └── main.tsx          # React entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing.  A
sample test in `src/api/costExplorer.test.ts` verifies that the
`fetchCostData` function returns the expected shape.  Run the test
suite with:

```bash
pnpm --filter react-finops-dashboard run test
```
