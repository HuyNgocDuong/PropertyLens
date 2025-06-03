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

// Import large images
import house1lg from '../assets/img/apartments/a1lg.png';
import house2lg from '../assets/img/apartments/a2lg.png';
import house3lg from '../assets/img/apartments/a3lg.png';
import house4lg from '../assets/img/apartments/a4lg.png';
import house5lg from '../assets/img/apartments/a5lg.png';
import house6lg from '../assets/img/apartments/a6lg.png';
import house7lg from '../assets/img/houses/house1lg.png';
import house8lg from '../assets/img/houses/house2lg.png';
import house9lg from '../assets/img/houses/house3lg.png';
import house10lg from '../assets/img/houses/house4lg.png';
import house11lg from '../assets/img/houses/house5lg.png';
import house12lg from '../assets/img/houses/house6lg.png';
import house13lg from '../assets/img/houses/house7lg.png';
import house14lg from '../assets/img/houses/house8lg.png';
import house15lg from '../assets/img/houses/house9lg.png';
import house16lg from '../assets/img/houses/house10lg.png';
import house17lg from '../assets/img/houses/house11lg.png';
import house18lg from '../assets/img/houses/house12lg.png';
import house19lg from '../assets/img/houses/house3lg.png'; 
import house20lg from '../assets/img/houses/house7lg.png'; 
import house21lg from '../assets/img/apartments/a5lg.png'; 
import house22lg from '../assets/img/apartments/a4lg.png';
import house23lg from '../assets/img/apartments/a6lg.png';
import house24lg from '../assets/img/apartments/a4lg.png'; 
import house25lg from '../assets/img/houses/house11lg.png';



// Map each House_ID to its large image
const houseImagesLg = {
  1: house1lg,
  2: house2lg,
  3: house3lg,
  4: house4lg,
  5: house5lg,
  6: house6lg,
  7: house7lg,
  8: house8lg,
  9: house9lg,
  10: house10lg,
  11: house11lg,
  12: house12lg,
  13: house13lg,
  14: house14lg,
  15: house15lg,
  16: house16lg,
  17: house17lg,
  18: house18lg,
  19: house19lg,
  20: house20lg,
  21: house21lg,
  22: house22lg,
  23: house23lg,
  24: house24lg,
  25: house25lg,
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