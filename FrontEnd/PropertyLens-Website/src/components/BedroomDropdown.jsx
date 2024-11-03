import React, { useContext } from 'react';
import { Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import { HouseContext } from './HouseContext';

const BedroomDropdown = () => {
  const { minBedrooms, setMinBedrooms, maxBedrooms, setMaxBedrooms } = useContext(HouseContext);

  const handleMinChange = (event) => {
    setMinBedrooms(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxBedrooms(event.target.value);
  };

  const bedroomOptions = [0, 1, 2, 3];

  return (
    <Box>
      <Typography variant="subtitle1">Min Bedrooms</Typography>
      <FormControl fullWidth>
        <Select
          value={minBedrooms}
          onChange={handleMinChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Bedrooms (any)</em>
          </MenuItem>
          {bedroomOptions.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1">Max Bedrooms</Typography>
      <FormControl fullWidth>
        <Select
          value={maxBedrooms}
          onChange={handleMaxChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Bedrooms (any)</em>
          </MenuItem>
          {bedroomOptions.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BedroomDropdown;
