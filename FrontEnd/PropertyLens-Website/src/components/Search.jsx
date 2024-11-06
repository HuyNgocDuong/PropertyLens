import React, { useState, useContext, useEffect } from 'react';
import { HouseContext } from './HouseContext';
import { Box, Button, Paper, Select, MenuItem, styled, Typography } from '@mui/material';
import { LocationOn, Bed, Bathtub } from '@mui/icons-material';

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
  margin: '0 0',
  flexWrap: 'wrap',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  // Base styles (mobile first - xs: 0px+)
  width: '140px',
  minWidth: '140px',
  backgroundColor: '#f0f0f5',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.up('sm')]: { // 600px+
    width: '160px',
    minWidth: '160px',
  },
  
  [theme.breakpoints.up('md')]: { // 900px+
    width: '180px',
    minWidth: '180px',
  },

  [theme.breakpoints.up('lg')]: { // 1200px+
    width: '200px',
    minWidth: '200px',
  },

  [theme.breakpoints.up('xl')]: { // 1536px+
    width: '220px',
    minWidth: '220px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "2rem 0",
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

const Search = () => {
  const { handleClick, suburbs} = useContext(HouseContext);
  const [suburb, setSuburb] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [minBathrooms, setMinBathrooms] = useState('');
  const [maxBathrooms, setMaxBathrooms] = useState('');

  const handleSearch = () => {
    handleClick({
      suburb: suburb || '',
      bedrooms: [minBedrooms || 0, maxBedrooms || 3],
      bathrooms: [minBathrooms || 0, maxBathrooms || 3],
    });
  };

  return (
    <StyledSearchContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
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
      </Box>
      <StyledButton onClick={handleSearch}>Search</StyledButton>

    </StyledSearchContainer>
  );
};

export default Search;
