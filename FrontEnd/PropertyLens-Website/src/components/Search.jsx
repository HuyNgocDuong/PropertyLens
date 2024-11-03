import React, { useState, useContext } from 'react';
import { HouseContext } from './HouseContext';
import { Box, Button, Paper, Select, MenuItem, styled } from '@mui/material';
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
  margin: '0 auto', // Center the search bar
  marginBottom: theme.spacing(4), // Add space below the search bar
}));


const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: '150px',
  backgroundColor: '#f0f0f5',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputContainer = styled(Select)(({ theme }) => ({
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
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(109, 40, 217, 0.6)',
  },
}));

const Search = () => {
  const { handleClick, suburbs } = useContext(HouseContext);
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
      
      <StyledInputContainer
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
      </StyledInputContainer>

      <StyledInputContainer
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
      </StyledInputContainer>

      <StyledInputContainer
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
      </StyledInputContainer>

      <StyledInputContainer
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
      </StyledInputContainer>

      <StyledButton onClick={handleSearch}>Search</StyledButton>
    </StyledSearchContainer>
  );
};

export default Search;
