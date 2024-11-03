import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { HouseContext } from '../components/HouseContext';

const PropertyDetails = () => {
  const { houseId } = useParams();
  const { getHouseById, selectedHouse, loading } = useContext(HouseContext);

  useEffect(() => {
    const parsedHouseId = parseInt(houseId, 10);
    if (!isNaN(parsedHouseId)) {
      getHouseById(parsedHouseId);
    } else {
      console.error("Invalid houseId:", houseId); // Log error if houseId is invalid
    }
  }, [houseId, getHouseById]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!selectedHouse) return <Typography>No property found for this ID.</Typography>;

  return (
    <Box>
      <Typography variant="h4">Property Details</Typography>
      <Box>
        <Typography variant="h6">Address: {selectedHouse.Address}</Typography>
        <Typography>Rooms: {selectedHouse.Rooms}</Typography>
        <Typography>Type: {selectedHouse.Type}</Typography>
        <Typography>Bedrooms: {selectedHouse.Bedroom2}</Typography>
        <Typography>Bathrooms: {selectedHouse.Bathroom}</Typography>
        <Typography>Postcode: {selectedHouse.Postcode}</Typography>
        <Typography>Council Area: {selectedHouse.CouncilArea}</Typography>
        <Typography>Schools Nearby: {selectedHouse["Schools nearby"]}</Typography>
        <Typography>Distance: {selectedHouse.Distance} km</Typography>
        <Box component="img" src={selectedHouse.ImageLg} alt="House" />
      </Box>
    </Box>
  );
};

export default PropertyDetails;
