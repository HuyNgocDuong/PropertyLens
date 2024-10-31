import React, { useState, useContext } from 'react';
import { Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

// Import house context
import { HouseContext } from './HouseContext';

const CountryDropdown = () => {
  const { country, setCountry, countries } = useContext(HouseContext);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl fullWidth>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={country}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <RiMapPinLine style={{ fontSize: 24, marginRight: 18, color: '#6366f1' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 600, lineHeight: 'tight', fontFamily: 'Poppins, sans-serif' }}>
                {selected || "Location (any)"}
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 400, fontFamily: 'Poppins, sans-serif' }}>
                Select your place
              </Typography>
            </Box>
            {open ? 
              <RiArrowDownSLine style={{ fontSize: 24, color: '#6366f1' }} /> : 
              <RiArrowUpSLine style={{ fontSize: 24, color: '#6366f1' }} />
            }
          </Box>
        )}
        IconComponent={() => null}
        sx={{
          height: 64,
          fontFamily: 'Poppins, sans-serif',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5e7eb',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5e7eb',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5e7eb',
          },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
          },
        }}
      >
        {Array.isArray(countries) && countries.length > 0 ? (
          countries.map((item, index) => (
            <MenuItem 
              value={item} 
              key={index}
              sx={{
                fontSize: 15,
                padding: '6px 24px',
                fontFamily: 'Poppins, sans-serif',
                '&:hover': {
                  color: '#7c3aed',
                },
              }}
            >
              {item}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No countries available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default CountryDropdown;