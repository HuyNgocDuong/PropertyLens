import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { housesData } from '../data';
import 'chart.js/auto';
import { green } from '@mui/material/colors';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables, zoomPlugin);

const violet = {
  500: "#7c3aed",
  600: "#6d28d9",
  700: "#5b21b6",
  800: "#4c1d95",
};

const PropertyDetails = () => {
  const { id } = useParams();
  const house = housesData.find((house) => house.id === parseInt(id));
  
  const priceChartRef = useRef(null);
  const [activeChart, setActiveChart] = useState(''); // Track which chart is active
  const [priceChartData, setPriceChartData] = useState(null);
  const [avgPriceChartData, setAvgPriceChartData] = useState(null);

  // Fetch data for Price Trend from API (Chart 1)
  useEffect(() => {
    const fetchPriceTrend = async () => {
      try {
        const response = await fetch(`http://localhost:8000/predict/house_price`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Rooms: house.Rooms, PropType: house.Type, Distance: house.Distance, Postcode: house.Postcode, Bedroom2: house.Bedroom2, Bathroom: house.Bathroom, Car: house.Car, RegionName: house.Regionname, SchoolNearBy: house['Schools nearby'] })
        });
        const data = await response.json();
        const priceTrendData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Predicted Price Trend ($)',
              data: [data.predicted_price, data.predicted_price * 1.1, data.predicted_price * 0.9, data.predicted_price * 1.2, data.predicted_price, data.predicted_price * 1.05],
              borderColor: violet[500],
              backgroundColor: 'rgba(124, 58, 237, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        };
        setPriceChartData(priceTrendData);
      } catch (error) {
        console.error("Error fetching price trend:", error);
      }
    };

    fetchPriceTrend();
  }, [house]);

  // Fetch data for Average Price by Property Type from API (Chart 4)
  useEffect(() => {
    const fetchAvgPriceByType = async () => {
      try {
        const response = await fetch(`http://localhost:8000/house/average_price_by_type`);
        const data = await response.json();
        const avgPriceData = {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Average Price by Property Type ($)',
              data: Object.values(data),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        };
        setAvgPriceChartData(avgPriceData);
      } catch (error) {
        console.error("Error fetching average price by type:", error);
      }
    };

    fetchAvgPriceByType();
  }, []);

  // Chart options with zoom and pan enabled
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // Only allow horizontal panning
        },
        zoom: {
          enabled: true,
          mode: 'x', // Only allow horizontal zooming
          speed: 0.1,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Price: $${context.raw.toLocaleString()}`,
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const bedroomsChartData = {
    labels: ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms'],
    datasets: [
      {
        data: [
          housesData.filter((item) => item.Bedroom2 === 1).length,
          housesData.filter((item) => item.Bedroom2 === 2).length,
          housesData.filter((item) => item.Bedroom2 === 3).length,
          housesData.filter((item) => item.Bedroom2 >= 4).length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'price':
        return (
          <Box sx={{ height: 400, mt: 2, p: 2 }}>
            <Typography variant="h6">Price Trend</Typography>
            {priceChartData ? (
              <Line ref={priceChartRef} data={priceChartData} options={chartOptions} />
            ) : (
              <Typography>Loading...</Typography>
            )}
            <Button onClick={() => priceChartRef.current?.resetZoom()} sx={{ mt: 2 }}>
              Reset Zoom
            </Button>
          </Box>
        );
      case 'averagePrice':
        return (
          <Box sx={{ height: 500, mt: 2, p: 3 }}>
            <Typography variant="h6">Average Price by Property Type</Typography>
            {avgPriceChartData ? (
              <Bar data={avgPriceChartData} options={chartOptions} />
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        );
      case 'bedrooms':
        return (
          <Box sx={{ height: 500, mt: 2, p: 3 }}>
            <Typography variant="h6">Bedrooms Distribution</Typography>
            <Pie data={bedroomsChartData} options={chartOptions} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="section" sx={{ minHeight: "800px", mb: 4, px: 2 }}>
      <Box sx={{ maxWidth: "lg", mx: "auto", mb: 4 }}>
        {/* Property Image */}
        <Box sx={{ position: "relative", mb: 2 }}>
          <Box
            component="img"
            src={house.imageLg}
            alt={house.Suburb}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Box>

        {/* Property Details */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ color: violet[600], fontWeight: 600 }}>
            ${house.price.toLocaleString()}
          </Typography>
        </Box>

        {/* Interactive Chart Buttons */}
        <Box display="flex" justifyContent="center" sx={{ gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={() => setActiveChart('price')} sx={{ backgroundColor: violet[700], color: "white" }}>Price Trend</Button>
          <Button variant="contained" onClick={() => setActiveChart('averagePrice')} sx={{ backgroundColor: green[700], color: "white" }}>Average Price by Type</Button>
          <Button variant="contained" onClick={() => setActiveChart('bedrooms')} sx={{ backgroundColor: violet[500], color: "white" }}>Bedrooms Distribution</Button>
        </Box>

        {/* Render Active Chart */}
        <Box sx={{ mt: 4 }}>
          {renderActiveChart()}
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
