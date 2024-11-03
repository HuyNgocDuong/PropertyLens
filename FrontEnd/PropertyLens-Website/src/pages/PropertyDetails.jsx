import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';

const PropertyDetails = () => {
  const location = useLocation(); // Get location object to access passed state
  const house = location.state.house; // Access the house object

  // Handle case where house is not found
  if (!house) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4">Property Not Found</Typography>
      </Box>
    );
  }

  // Sample data for charts (replace with your actual data)
  const chartData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Price Distribution',
        data: [10, 20, 30], // Example data
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the charts
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box component="section" sx={{ minHeight: "800px", mb: 4, px: 2 }}>
      <Box sx={{ maxWidth: "lg", mx: "auto", mb: 4 }}>
        {/* Property Image */}
        <Box sx={{ position: "relative", mb: 2 }}>
          <img
            src={house.imageLg} // Use the large image from the context or API
            alt={house.Suburb}
            style={{
              width: "100%",
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          />
        </Box>

        {/* Property Details */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ color: "#7c3aed", fontWeight: 600 }}>
            ${house.price.toLocaleString()}
          </Typography>
          <Typography variant="h6">Details</Typography>
          <Typography variant="body1">Suburb: {house.Suburb}</Typography>
          <Typography variant="body1">Bedrooms: {house.Bedroom2}</Typography>
          <Typography variant="body1">Bathrooms: {house.Bathroom}</Typography>
          <Typography variant="body1">Postcode: {house.Postcode}</Typography>
        </Box>

        {/* Chart 1: Line Chart */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" align="center">Price Trend Over Time</Typography>
          <Line data={chartData} options={options} />
        </Box>

        {/* Chart 2: Bar Chart */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" align="center">Bedrooms Distribution</Typography>
          <Bar data={chartData} options={options} />
        </Box>

        {/* Chart 3: Pie Chart */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" align="center">Property Type Distribution</Typography>
          <Pie data={chartData} options={options} />
        </Box>

        {/* Back button */}
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => window.history.back()}>
            Back to Listings
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
