import React, { useState } from 'react';
import Search from './Search';
import { Box, Button, Typography } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart elements for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SearchWithCharts = () => {
  const [activeChart, setActiveChart] = useState(null);

  // Sample data for the charts (Replace with actual data if available)
  const bedroomsData = {
    labels: ['1 Bed', '2 Beds', '3 Beds', '4 Beds', '5+ Beds'],
    datasets: [
      {
        label: 'Bedrooms Distribution',
        data: [10, 20, 15, 30, 25],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      },
    ],
  };

  const schoolProximityData = {
    labels: ['0-1 km', '1-3 km', '3-5 km', '5+ km'],
    datasets: [
      {
        label: 'Number of Schools Nearby',
        data: [5, 10, 7, 3],
        backgroundColor: '#36a2eb',
      },
    ],
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Search />

      {/* Buttons for toggling charts */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => setActiveChart(activeChart === 'bedrooms' ? null : 'bedrooms')}
          sx={{ mr: 2 }}
        >
          Toggle Bedrooms Chart
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveChart(activeChart === 'schools' ? null : 'schools')}
        >
          Toggle School Proximity Chart
        </Button>
      </Box>

      {/* Conditional rendering for each chart based on activeChart state */}
      {activeChart === 'bedrooms' && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Bedrooms Comparison</Typography>
          <Pie data={bedroomsData} />
        </Box>
      )}

      {activeChart === 'schools' && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">School Proximity Analysis Across Houses</Typography>
          <Bar data={schoolProximityData} />
        </Box>
      )}
    </Box>
  );
};

export default SearchWithCharts;
