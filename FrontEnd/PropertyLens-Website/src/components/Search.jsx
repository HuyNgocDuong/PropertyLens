import React, { useState, useContext, useEffect } from 'react';
import { HouseContext } from './HouseContext';
import { Box, Button, Paper, Select, MenuItem, styled, Typography } from '@mui/material';
import { LocationOn, Bed, Bathtub } from '@mui/icons-material';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const StyledSearchContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(8px)',
  width: '90%',
  maxWidth: '1200px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap', // Allow wrapping for responsive layout
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: '150px',
  backgroundColor: '#f0f0f5',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6d28d9, #b389ff)',
  color: '#fff',
  fontWeight: 600,
  padding: theme.spacing(1, 4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 14px rgba(109, 40, 217, 0.4)',
  minWidth: '150px',
  height: '40px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(109, 40, 217, 0.6)',
  },
}));

const StyledChartButton = styled(StyledButton)(({ theme }) => ({
  padding: theme.spacing(1, 3), 
  minWidth: '150px', 
  height: '40px',
  marginLeft: theme.spacing(2),
}));

const Search = () => {
  const { handleClick, suburbs, houses } = useContext(HouseContext);
  const [suburb, setSuburb] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [minBathrooms, setMinBathrooms] = useState('');
  const [maxBathrooms, setMaxBathrooms] = useState('');
  const [activeChart, setActiveChart] = useState(null);
  const [bedroomsData, setBedroomsData] = useState({});
  const [schoolProximityData, setSchoolProximityData] = useState({});

  const handleSearch = () => {
    handleClick({
      suburb: suburb || '',
      bedrooms: [minBedrooms || 0, maxBedrooms || 3],
      bathrooms: [minBathrooms || 0, maxBathrooms || 3],
    });
  };

  useEffect(() => {
    // Calculate Bedrooms Data
    const bedroomCounts = { "1 Bed": 0, "2 Beds": 0, "3 Beds": 0};
    houses.forEach(house => {
      const bedrooms = house.Bedroom2;
      if (bedrooms === 1) bedroomCounts["1 Bed"]++;
      else if (bedrooms === 2) bedroomCounts["2 Beds"]++;
      else if (bedrooms === 3) bedroomCounts["3 Beds"]++;
    });

    setBedroomsData({
      labels: Object.keys(bedroomCounts),
      datasets: [{
        label: 'Bedrooms Distribution',
        data: Object.values(bedroomCounts),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      }],
    });

    // Calculate School Proximity Data
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

    setSchoolProximityData({
      labels: distanceRanges.map(range => range.label),
      datasets: [{
        label: 'Number of Schools Nearby Across Houses',
        data: schoolProximityCounts,
        backgroundColor: '#36a2eb',
      }],
    });
  }, [houses]);

  return (
    <StyledSearchContainer>
      {/* Existing Search Fields */}
      <StyledSelect
        value={suburb}
        onChange={(e) => setSuburb(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Suburb' }}
      >
        <MenuItem value="">
          <em>
            <LocationOn fontSize="small" style={{ marginRight: 4 }} />
            Suburb (any)
          </em>
        </MenuItem>
        {suburbs.map((sub, index) => (
          <MenuItem key={index} value={sub}>
            {sub}
          </MenuItem>
        ))}
      </StyledSelect>
      
      <StyledSelect
        value={minBedrooms}
        onChange={(e) => setMinBedrooms(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Min Beds' }}
      >
        <MenuItem value="">
          <em>
            <Bed fontSize="small" style={{ marginRight: 4 }} />
            Min Beds
          </em>
        </MenuItem>
        {[1, 2, 3].map((i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSelect
        value={maxBedrooms}
        onChange={(e) => setMaxBedrooms(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Max Beds' }}
      >
        <MenuItem value="">
          <em>
            <Bed fontSize="small" style={{ marginRight: 4 }} />
            Max Beds
          </em>
        </MenuItem>
        {[1, 2, 3].map((i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSelect
        value={minBathrooms}
        onChange={(e) => setMinBathrooms(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Min Baths' }}
      >
        <MenuItem value="">
          <em>
            <Bathtub fontSize="small" style={{ marginRight: 4 }} />
            Min Baths
          </em>
        </MenuItem>
        {[1, 2, 3].map((i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSelect
        value={maxBathrooms}
        onChange={(e) => setMaxBathrooms(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Max Baths' }}
      >
        <MenuItem value="">
          <em>
            <Bathtub fontSize="small" style={{ marginRight: 4 }} />
            Max Baths
          </em>
        </MenuItem>
        {[1, 2, 3].map((i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledButton onClick={handleSearch}>Search</StyledButton>

      {/* Chart Buttons */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <StyledChartButton
          onClick={() => setActiveChart(activeChart === 'bedrooms' ? null : 'bedrooms')}
        >
          Bedrooms Chart
        </StyledChartButton>
        <StyledChartButton
          onClick={() => setActiveChart(activeChart === 'schools' ? null : 'schools')}
        >
          School Proximity Chart
        </StyledChartButton>
      </Box>

      {/* Chart Rendering */}
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
    </StyledSearchContainer>
  );
};

export default Search;
