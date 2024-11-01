import React from 'react';
import { Box, Container, Typography, TextField, Select, MenuItem, Button, Grid, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
      },
    },
  },
});

const PredictForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Rooms" type="number" placeholder="Enter number of rooms" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Distance" type="number" placeholder="Enter distance" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Postcode" type="number" placeholder="Enter postcode" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Bedrooms" type="number" placeholder="Enter number of bedrooms" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Bathrooms" type="number" placeholder="Enter number of bathrooms" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Car Spaces" type="number" placeholder="Enter number of car spaces" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Landsize" type="number" placeholder="Enter landsize" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Building Area" type="number" placeholder="Enter building area" required />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    label="Type"
                    defaultValue=""
                    required
                  >
                    <MenuItem value="h">H - House,Cottage,Villa,Semi,Terrace</MenuItem>
                    <MenuItem value="u">U - Unit,Duplex</MenuItem>
                    <MenuItem value="t">T - Townhouse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    label="Region*"
                    defaultValue=""
                    required
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
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PredictForm;