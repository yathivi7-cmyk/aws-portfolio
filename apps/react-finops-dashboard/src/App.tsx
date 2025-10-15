import React from 'react';
import CostChart from './components/CostChart';

/**
 * Top‑level React component for the FinOps dashboard.  Renders a
 * heading and the cost chart component.
 */
const App: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>AWS FinOps Dashboard</h1>
      <p>Monthly cost explorer for your AWS account.</p>
      <CostChart />
    </div>
  );
};

export default App;