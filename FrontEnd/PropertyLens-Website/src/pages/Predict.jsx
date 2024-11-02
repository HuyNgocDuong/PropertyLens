import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { PredictPriceChart } from "../components/PredictPriceChart";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const PredictForm = () => {
  const [formData, setFormData] = useState({
    Rooms: "",
    PropType: "",
    Distance: "",
    Postcode: "",
    Bedroom2: "",
    bathrooms: "",
    Bathroom: "",
    Car: "",
    RegionName: "",
    SchoolNearBy: "",
  });

  const [predictedPrice, setPredictedPrice] = useState(null); // Stores multiple predictions

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
      const response = await axios.post(
        "http://localhost:8000/predict/house_price",
        {
          Rooms: formData.Rooms,
          PropType: formData.PropType,
          Distance: formData.Distance,
          Postcode: formData.Postcode,
          Bedroom2: formData.Bedroom2,
          Bathroom: formData.Bathroom,
          Car: formData.Car,
          RegionName: formData.RegionName,
          SchoolNearBy: formData.SchoolNearBy,
        }
      );
      setPredictedPrice(response.data.predicted_price);
      // const predictedPrice = response.data.predicted_price;
      // setPredictedPrice((prevPredictions) => [
      //   ...prevPredictions,
      //   {
      //     label: `Prediction ${prevPredictions.length + 1}`,
      //     price: predictedPrice,
      //   },
      // ]);
    } catch (error) {
      console.error("Error fetching predicted price:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Form for House Price Prediction */}
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            mt: 4,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            House Price Prediction Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rooms"
                  name="Rooms"
                  type="number"
                  value={formData.Rooms}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Distance"
                  name="Distance"
                  type="number"
                  value={formData.Distance}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postcode"
                  name="Postcode"
                  type="number"
                  value={formData.Postcode}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bedrooms"
                  name="Bedroom2"
                  type="number"
                  value={formData.Bedroom2}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bathrooms"
                  name="Bathroom"
                  type="number"
                  value={formData.Bathroom}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Car Spaces"
                  name="Car"
                  type="number"
                  value={formData.Car}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="School Near By"
                  name="SchoolNearBy"
                  type="number"
                  value={formData.SchoolNearBy}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ height: "60px" }}>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    name="PropType"
                    value={formData.PropType}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: "1.1rem", height: "60px" }}
                  >
                    <MenuItem value="h">
                      H - House, Cottage, Villa, Semi, Terrace
                    </MenuItem>
                    <MenuItem value="u">U - Unit, Duplex</MenuItem>
                    <MenuItem value="t">T - Townhouse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ height: "60px" }}>
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    name="RegionName"
                    value={formData.RegionName}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: "1.1rem", height: "60px" }}
                  >
                    <MenuItem value="Eastern Metropolitan">
                      Eastern Metropolitan
                    </MenuItem>
                    <MenuItem value="Eastern Victoria">
                      Eastern Victoria
                    </MenuItem>
                    <MenuItem value="Northern Metropolitan">
                      Northern Metropolitan
                    </MenuItem>
                    <MenuItem value="Northern Victoria">
                      Northern Victoria
                    </MenuItem>
                    <MenuItem value="South-Eastern Metropolitan">
                      South-Eastern Metropolitan
                    </MenuItem>
                    <MenuItem value="Southern Metropolitan">
                      Southern Metropolitan
                    </MenuItem>
                    <MenuItem value="Western Metropolitan">
                      Western Metropolitan
                    </MenuItem>
                    <MenuItem value="Western Victoria">
                      Western Victoria
                    </MenuItem>
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
                bgcolor: "rgb(130, 106, 251)",
                "&:hover": { bgcolor: "rgb(88, 56, 250)" },
                height: "60px",
                fontSize: "1.2rem",
              }}
            >
              Predict Price
            </Button>
          </Box>
          {predictedPrice !== null && (
            <Box mt={4} textAlign="center">
              <Typography variant="h5">
                Predicted Price: ${predictedPrice.toFixed(2)}
              </Typography>
            </Box>
          )}
          {/* {predictedPrice.length > 0 && (
            <PredictionChart predictions={predictedPrice} /> // Render chart component
          )} */}
        </Box>

        {/* Chart */}
        <Typography variant="h4" component="h1" gutterBottom align="center">
          House Price Prediction Graph
        </Typography>
        {/* Price chart component */}
        <PredictPriceChart />
      </Container>
    </ThemeProvider>
  );
};

export default PredictForm;
