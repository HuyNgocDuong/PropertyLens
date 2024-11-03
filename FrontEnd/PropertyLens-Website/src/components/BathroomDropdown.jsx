import React, { useContext } from 'react';
import { Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import { HouseContext } from './HouseContext';

const BathroomDropdown = () => {
  const { minBathrooms, setMinBathrooms, maxBathrooms, setMaxBathrooms } = useContext(HouseContext);

  const handleMinChange = (event) => {
    setMinBathrooms(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxBathrooms(event.target.value);
  };

  const bathroomOptions = [0, 1, 2, 3];

  return (
    <Box>
      <Typography variant="subtitle1">Min Bathrooms</Typography>
      <FormControl fullWidth>
        <Select
          value={minBathrooms}
          onChange={handleMinChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Bathrooms (any)</em>
          </MenuItem>
          {bathroomOptions.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle1">Max Bathrooms</Typography>
      <FormControl fullWidth>
        <Select
          value={maxBathrooms}
          onChange={handleMaxChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Bathrooms (any)</em>
          </MenuItem>
          {bathroomOptions.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BathroomDropdown;
