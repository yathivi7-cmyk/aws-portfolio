import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchCostData } from '../api/costExplorer';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

/**
 * Fetches monthly AWS cost data and renders it as a bar chart.
 */
const CostChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    // In a real application this would call an API endpoint to fetch
    // cost data.  Here we use a mocked function that returns sample
    // values for demonstration purposes.
    fetchCostData().then((data) => {
      setLabels(data.labels);
      setValues(data.values);
    });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Cost ($)',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default CostChart;