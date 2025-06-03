// import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import React, { useState, useContext, useEffect } from 'react';
// Import components
import Banner from "../components/Banner";
import HouseList from "../components/HouseList";
import Search from "../components/Search";
import { Pie, Line } from 'react-chartjs-2';
import { styled } from '@mui/system';
import { HouseContext } from '../components/HouseContext';

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6d28d9, #b389ff)',
  color: '#fff',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 14px rgba(109, 40, 217, 0.4)',
  transition: 'transform 0.2s ease',
  
  // Base styles (mobile first)
  padding: theme.spacing(0.75, 2),
  minWidth: '120px',
  height: '36px',
  fontSize: '0.6rem',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0.75, 3),
    minWidth: '135px',
    height: '38px',
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 4),
    minWidth: '150px',
    height: '40px',
    fontSize: '1rem',
  },

  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(109, 40, 217, 0.6)',
  },
}));

const StyledChartButton = styled(StyledButton)(({ theme }) => ({
  // Base styles (mobile first)
  padding: theme.spacing(0.75, 2),
  minWidth: '110px',
  marginLeft: theme.spacing(1),
  marginTop: theme.spacing(1),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0.75, 2.5),
    minWidth: '130px',
    marginLeft: theme.spacing(1.5),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 3),
    minWidth: '150px',
    marginLeft: theme.spacing(2),
  },
}));

const Home = () => {
  const {houses } = useContext(HouseContext);
  const [activeChart, setActiveChart] = useState(null);
  const [priceCategoryData, setPriceCategoryData] = useState({});
  const [priceTrendData, setPriceTrendData] = useState({});
  useEffect(() => {
    // Calculate Price Category Distribution Data
    const categoryCounts = houses.reduce((acc, house) => {
      acc[house.Price_Category] = (acc[house.Price_Category] || 0) + 1;
      return acc;
    }, {});

    setPriceCategoryData({
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: 'Price Category Distribution',
          data: Object.values(categoryCounts),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
        },
      ],
    });

    // Calculate Price Trend Over Time Data
    const sortedHouses = [...houses].sort((a, b) => new Date(a.Date) - new Date(b.Date));
    const dates = sortedHouses.map(house => house.Date);
    const prices = sortedHouses.map(house => house.Price);

    setPriceTrendData({
      labels: dates,
      datasets: [
        {
          label: 'Price Trend Over Time',
          data: prices,
          fill: false,
          borderColor: '#36a2eb',
          tension: 0.1,
        },
      ],
    });
  }, [houses]);
  return (
    <Box sx={{ minHeight: "200vh", height: "fit-content", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Banner />
      <Search />
            {/* Chart Buttons */}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
        <StyledChartButton
          onClick={() => setActiveChart(activeChart === 'priceCategory' ? null : 'priceCategory')}
        >
          Price Category Chart
        </StyledChartButton>
        <StyledChartButton
          onClick={() => setActiveChart(activeChart === 'priceTrend' ? null : 'priceTrend')}
        >
          Price Trend Chart
        </StyledChartButton>
      </Box>

      {/* Chart Rendering */}
      {activeChart === 'priceCategory' && (
        <Box sx={{ mt: 3, width: '80%', maxWidth: '400px', height: 'auto' }}>
          <Typography variant="h6">Price Category Distribution</Typography>
          <Pie data={priceCategoryData} options={{ maintainAspectRatio: true, responsive: true }} />
        </Box>
      )}

      {activeChart === 'priceTrend' && (
        <Box sx={{ mt: 3, width: '80%', maxWidth: '800px', height: 'auto' }}>
          <Typography variant="h6">Price Trend Over Time</Typography>
          <Line 
            data={priceTrendData} 
            options={{ 
              maintainAspectRatio: true, 
              responsive: true,
              scales: {
                x: {
                  min: 0,
                  ticks: {
                    stepSize: 1,
                    callback: function(value) {
                      if (Math.floor(value) === value) {
                        return value;
                      }
                    }
                  }
                }
              }
            }} 
          />
        </Box>
      )}
      <HouseList />
    </Box>
  );
};

export default Home;
