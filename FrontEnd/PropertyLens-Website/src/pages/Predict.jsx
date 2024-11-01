import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Select, MenuItem, Button, Grid, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const PredictForm = () => {
  const [formData, setFormData] = useState({
    houseid: '',
    rooms: '',
    distance: '',
    postcode: '',
    bedrooms: '',
    bathrooms: '',
    carSpaces: '',
    landsize: '',
    buildingArea: '',
    type: '',
    region: '',
  });
  
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/predict/house_price', {
        rooms: formData.rooms,
        distance: formData.distance,
        postcode: formData.postcode,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        carSpaces: formData.carSpaces,
        type: formData.type,
        region: formData.region,
      });
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      console.error("Error fetching predicted price:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          mt: 4,
        }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            House Price Prediction Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rooms"
                  name="rooms"
                  type="number"
                  value={formData.rooms}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: '60px', fontSize: '1.1rem' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Distance"
                  name="distance"
                  type="number"
                  value={formData.distance}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: '60px', fontSize: '1.1rem' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postcode"
                  name="postcode"
                  type="number"
                  value={formData.postcode}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: '60px', fontSize: '1.1rem' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: '60px', fontSize: '1.1rem' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: '60px', fontSize: '1.1rem' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Car Spaces"
                  name="carSpaces"
                  type="number"
                  value={formData.carSpaces}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: '60px', fontSize: '1.1rem' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ height: '60px' }}>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '1.1rem', height: '60px' }}
                  >
                    <MenuItem value="h">H - House, Cottage, Villa, Semi, Terrace</MenuItem>
                    <MenuItem value="u">U - Unit, Duplex</MenuItem>
                    <MenuItem value="t">T - Townhouse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ height: '60px' }}>
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '1.1rem', height: '60px' }}
                  >
                    <MenuItem value="Eastern Metropolitan">Eastern Metropolitan</MenuItem>
                    <MenuItem value="Eastern Victoria">Eastern Victoria</MenuItem>
                    <MenuItem value="Northern Metropolitan">Northern Metropolitan</MenuItem>
                    <MenuItem value="Northern Victoria">Northern Victoria</MenuItem>
                    <MenuItem value="South-Eastern Metropolitan">South-Eastern Metropolitan</MenuItem>
                    <MenuItem value="Southern Metropolitan">Southern Metropolitan</MenuItem>
                    <MenuItem value="Western Metropolitan">Western Metropolitan</MenuItem>
                    <MenuItem value="Western Victoria">Western Victoria</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 4, 
                mb: 2, 
                bgcolor: 'rgb(130, 106, 251)', 
                '&:hover': { bgcolor: 'rgb(88, 56, 250)' },
                height: '60px',
                fontSize: '1.2rem'
              }}
            >
              Predict Price
            </Button>
          </Box>
          {predictedPrice !== null && (
            <Box mt={4} textAlign="center">
              <Typography variant="h5">Predicted Price: ${predictedPrice.toFixed(2)}</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PredictForm;
