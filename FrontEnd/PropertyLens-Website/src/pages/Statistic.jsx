// PropertyChartsPage.js
import React, { useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { HouseContext } from '../components/HouseContext';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';

const Statistic = () => {
  const { houses } = useContext(HouseContext); // Access house data from context
  const [activeChart, setActiveChart] = useState(null);

  // Aggregate bedroom counts across all houses for comparison
  const bedroomCounts = { "1 Bed": 0, "2 Beds": 0, "3 Beds": 0, "4 Beds": 0, "5+ Beds": 0 };
  houses.forEach(house => {
    const bedrooms = house.Bedroom2;
    if (bedrooms === 1) bedroomCounts["1 Bed"]++;
    else if (bedrooms === 2) bedroomCounts["2 Beds"]++;
    else if (bedrooms === 3) bedroomCounts["3 Beds"]++;
    else if (bedrooms === 4) bedroomCounts["4 Beds"]++;
    else bedroomCounts["5+ Beds"]++;
  });

  const bedroomsData = {
    labels: Object.keys(bedroomCounts),
    datasets: [{
      label: 'Bedrooms Distribution',
      data: Object.values(bedroomCounts),
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
    }],
  };

  // Aggregate school proximity data across all houses
  const distanceRanges = [
    { label: '0-1 km', min: 0, max: 1 },
    { label: '1-3 km', min: 1, max: 3 },
    { label: '3-5 km', min: 3, max: 5 },
    { label: '5+ km', min: 5, max: Infinity },
  ];

  const schoolProximityCounts = distanceRanges.map(range => {
    return houses.filter(house => house.Distance >= range.min && house.Distance < range.max)
                 .reduce((sum, house) => sum + house["Schools nearby"], 0);
  });

  const schoolProximityData = {
    labels: distanceRanges.map(range => range.label),
    datasets: [{
      label: 'Number of Schools Nearby Across Houses',
      data: schoolProximityCounts,
      backgroundColor: '#36a2eb',
    }],
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Property Charts
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
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

      {activeChart === 'bedrooms' && (
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h6">Bedrooms Comparison</Typography>
          <Pie data={bedroomsData} />
        </Box>
      )}

      {activeChart === 'schools' && (
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h6">School Proximity Analysis Across Houses</Typography>
          <Bar data={schoolProximityData} />
        </Box>
      )}
    </Box>
  );
};

export default Statistic;
