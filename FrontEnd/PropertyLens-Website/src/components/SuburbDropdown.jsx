import React, { useContext, useState } from 'react';
import { Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

// Import house context
import { HouseContext } from './HouseContext';

const SuburbDropdown = () => {
  const { suburb, setSuburb, suburbs } = useContext(HouseContext);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSuburb(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl fullWidth sx={{ marginTop: 3.5 }}> {/* Add marginTop here */}
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={suburb}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <RiMapPinLine style={{ fontSize: 24, marginRight: 18, color: '#6366f1' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 'tight',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {selected || "Suburb (any)"}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: 'text.secondary',
                  fontWeight: 400,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Select your suburb
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
          height: 64, // Set height to match other dropdowns and buttons
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
            padding: '0 18px', // Maintain consistent padding
          },
        }}
      >
        {Array.isArray(suburbs) && suburbs.length > 0 ? (
          suburbs.map((item, index) => (
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
          <MenuItem disabled>No suburbs available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SuburbDropdown;
