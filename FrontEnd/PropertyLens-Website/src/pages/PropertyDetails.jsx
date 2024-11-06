import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Divider, Chip, Button } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { HouseContext } from '../components/HouseContext';
import PinDropIcon from '@mui/icons-material/PinDrop';

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

// Create a helper function to import images dynamically
const importAll = (r) => {
  const images = {};
  r.keys().forEach((item, index) => {
    // Extract the house number from the filename
    const houseId = parseInt(item.match(/\d+/)[0]);
    images[houseId] = r(item);
  });
  return images;
};

// Import all apartment images
const apartmentImages = importAll(require.context('../assets/img/apartments', false, /a\dlg\.png$/));
// Import all house images
const houseImages = importAll(require.context('../assets/img/houses', false, /house\d+lg\.png$/));

// Combine all images into one object
const houseImagesLg = {
  ...apartmentImages,
  ...houseImages
};

const PropertyDetails = () => {
  const { houseId } = useParams();
  const { getHouseById, selectedHouse, houses, loading } = useContext(HouseContext);
  const [activeChart, setActiveChart] = useState(null);

  useEffect(() => {
    const parsedHouseId = parseInt(houseId, 10);
    if (!isNaN(parsedHouseId)) {
      getHouseById(parsedHouseId);
    } else {
      console.error("Invalid houseId:", houseId);
    }
  }, [houseId, getHouseById]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );

  if (!selectedHouse) return <Typography>No property found for this ID.</Typography>;

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
    <Box
      sx={{
        mb: 3,
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: 'linear-gradient(45deg, #8a2be2, #d896ff)', // Gradient similar to the button
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Property Details
      </Typography>

      <Grid container justifyContent="center" spacing={1} sx={{ my: 2 }}>
        <Grid item>
          <Chip
            icon={<LocationOnIcon />}
            label={`${selectedHouse.Address}, ${selectedHouse.Suburb}`}
            sx={{ backgroundColor: '#ffeb3b', color: 'black' }} // Bright yellow background
          />
        </Grid>
        <Grid item>
          <Chip
            icon={<HomeWorkIcon />}
            label={`Type: ${selectedHouse.Type.toUpperCase()}`}
            sx={{ backgroundColor: '#00e676', color: 'black' }} // Bright green background
          />
        </Grid>
        <Grid item>
          <Chip
            icon={<SchoolIcon />}
            label={`Schools Nearby: ${selectedHouse["Schools nearby"]}`}
            sx={{ backgroundColor: '#ff5722', color: 'white' }} // Bright orange background
          />
        </Grid>
        <Grid item>
          <Chip
            label={`Council Area: ${selectedHouse.CouncilArea}`}
            sx={{ backgroundColor: '#03a9f4', color: 'white' }} // Bright blue background
          />
        </Grid>
      </Grid>
    </Box>

      <Box component="img" src={houseImagesLg[selectedHouse.House_ID] || house1lg} alt="House"
        sx={{ width: '100%', height: '400px', objectFit: 'cover', mb: 3 }}
      />
      
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="body1">
              <BedIcon fontSize="small" /> Bedrooms: {selectedHouse.Bedroom2}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <BathtubIcon fontSize="small" /> Bathrooms: {selectedHouse.Bathroom}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <PinDropIcon fontSize="small" /> Postcode: {selectedHouse.Postcode}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <LocationOnIcon fontSize="small" /> Distance: {selectedHouse.Distance} km
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Box>
    </Box>
  );
};

export default PropertyDetails;  