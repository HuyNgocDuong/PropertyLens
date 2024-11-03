import React, { useState, useEffect } from "react";
import zoomPlugin from "chartjs-plugin-zoom"; // Import the zoom plugin
// Import for Line and Pie Chart from ChartJS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Import from MaterialUI
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

import { Line, Pie } from "react-chartjs-2";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const chartRef = React.createRef();

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

// Hold data from the FORM
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
  // Create UseState
  const [predictedPrice, setPredictedPrice] = useState(null); // Actual Price Prediction
  const [predictedCategory, setPredictedCategory] = useState(null); // Actual Category prediction
  const [pricePredictions, setPricePredictions] = useState([]); // Stores predictions for the chart
  const [lineChartData, setLineChartData] = useState(null); // Store chart data here
  const [categoryChartData, setCategoryChartData] = useState(null); // Pie chart data
  const [errors, setErrors] = useState({});

  // Form Validation
  const validateForm = () => {
    // Error Message
    const newErrors = {};
    // Validation for empty submission
    if (!formData.Rooms) newErrors.Rooms = "Rooms are required";
    if (!formData.PropType) newErrors.PropType = "Property type is required";
    if (!formData.Distance) newErrors.Distance = "Distance is required";
    if (!formData.Postcode) newErrors.Postcode = "Postcode is required";
    if (!formData.Bedroom2)
      newErrors.Bedroom2 = "Number of bedrooms is required";
    if (!formData.Bathroom)
      newErrors.Bathroom = "Number of bathrooms is required";
    if (!formData.Car) newErrors.Car = "Number of car spaces is required";
    if (!formData.RegionName) newErrors.RegionName = "Region is required";
    if (!formData.SchoolNearBy)
      newErrors.SchoolNearBy = "Nearby schools data is required";

    // Check for negative numbers
    const numericFields = [
      "Rooms",
      "Distance",
      "Postcode",
      "Bedroom2",
      "Bathroom",
      "Car",
      "SchoolNearBy",
    ];
    for (const field of numericFields) {
      if (formData[field] < 0) {
        newErrors[field] = `${field} cannot be a negative number.`; // Assign negative number error message for each field
      }
    }
    if (formData.Rooms > 7) {
      newErrors.Rooms = "Can't enter value of room more than 7";
    }
    if (formData.Distance > 30) {
      newErrors.Distance = "Can't enter value of distance more than 30";
    }
    // if (formData.Postcode > 10) {
    //   newErrors.Postcode = "Can't enter value of Room more than 10";
    // }
    if (formData.Bedroom2 > 5) {
      newErrors.Bedroom2 = "Can't enter value of bedroom more than 5";
    }
    if (formData.Bathroom > 5) {
      newErrors.Bathroom = "Can't enter value of bathroom more than 5";
    }
    if (formData.Car > 5) {
      newErrors.Car = "Can't enter value of car more than 5";
    }
    if (formData.SchoolNearBy > 5) {
      newErrors.SchoolNearBy =
        "Can't enter value of school near by more than 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle Change of input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle Price Prediction Submit button
  const handlePricePrediction = async (e) => {
    e.preventDefault();
    // return if any input error occurs
    if (!validateForm()) return;
    try {
      // Predict Actual Price
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
      console.log(response.data); // Log to console for debug
      setPredictedPrice(response.data.predicted_price);

      // Prepare data for the chart
      const bedroomCounts = [1, 2, 3, 4, 5];
      const predictions = await Promise.all(
        bedroomCounts.map(async (bedroom) => {
          const modifiedData = { ...formData, Bedroom2: bedroom };
          const res = await axios.post(
            "http://localhost:8000/predict/house_price",
            modifiedData
          );
          return { bedroom, price: res.data.predicted_price };
        })
      );
      setPricePredictions(predictions); // Store predictions for the chart

      // Creating the chart data using the prediction from backend
      const newChartData = {
        labels: bedroomCounts,
        datasets: [
          {
            label: "Predicted Prices",
            data: predictions.map((pred) => pred.price), // Extract only the prices
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            tension: 0.1,
          },
          {
            label: "Your Prediction",
            data: [
              {
                x: parseInt(formData.Bedroom2),
                y: response.data.predicted_price,
              },
            ],
            borderColor: "rgb(88, 56, 250)",
            backgroundColor: "rgb(130, 106, 251)",
            pointRadius: 12,
            pointHoverRadius: 16,
            showLine: false, // Show only the point for the user's prediction
          },
        ],
      };
      setLineChartData(newChartData);
    } catch (error) {
      console.error("Error fetching predicted price:", error);
    }
  };

  const handleCategoryPrediction = async (e) => {
    e.preventDefault();
    // return if any input error occurs
    if (!validateForm()) return;
    try {
      // Predict house price category
      const response = await axios.post(
        "http://localhost:8000/predict/price_category",
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
      console.log(response.data); // Log to console for debug
      setPredictedCategory(response.data.predicted_category);

      // Create pie chart data
      const categories = ["Affortable", "Fixer-Upper", "Luxury"];
      const categoryCounts = [56, 29, 15]; // Example distribution, replace with actual response data

      const newCategoryChartData = {
        labels: categories,
        datasets: [
          {
            label: "Percentage",
            data: categoryCounts,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: [
              "rgb(130, 106, 251)",
              "rgb(130, 106, 251)",
              "rgb(130, 106, 251)",
            ],
          },
        ],
      };
      setCategoryChartData(newCategoryChartData);
    } catch (error) {
      console.error("Error fetching predicted category:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Form for Prediction */}
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
            Prediction Form
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            {/* GRID Container */}
            <Grid container spacing={3}>
              {/* GRID for each inputs */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rooms"
                  name="Rooms"
                  type="number"
                  value={formData.Rooms}
                  onChange={handleChange}
                  error={!!errors.Rooms}
                  helperText={errors.Rooms}
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
                  error={!!errors.Distance}
                  helperText={errors.Distance}
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
                  error={!!errors.Bedroom2}
                  helperText={errors.Bedroom2}
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
                  error={!!errors.Bathroom}
                  helperText={errors.Bathroom}
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
                  error={!!errors.Car}
                  helperText={errors.Car}
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
                  error={!!errors.SchoolNearBy}
                  helperText={errors.SchoolNearBy}
                  required
                  fullWidth
                  sx={{ height: "60px", fontSize: "1.1rem" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Postcode"
                  name="Postcode"
                  type="number"
                  value={formData.Postcode}
                  onChange={handleChange}
                  error={!!errors.Postcode}
                  helperText={errors.Postcode}
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
                    error={!!errors.PropType}
                    required
                    sx={{ fontSize: "1.1rem", height: "60px" }}
                  >
                    <MenuItem value="h">
                      H - House, Cottage, Villa, Semi, Terrace
                    </MenuItem>
                    <MenuItem value="u">U - Unit, Duplex</MenuItem>
                    <MenuItem value="t">T - Townhouse</MenuItem>
                  </Select>
                  {errors.PropType && (
                    <Typography variant="body2" color="error">
                      {errors.PropType}
                    </Typography>
                  )}
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
                    error={!!errors.RegionName}
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
                  {errors.RegionName && (
                    <Typography variant="body2" color="error">
                      {errors.RegionName}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              {/* GRID - Buttons */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  onClick={handlePricePrediction}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCategoryPrediction}
                  sx={{
                    mt: 4,
                    bgcolor: "rgb(255, 167, 38)",
                    "&:hover": { bgcolor: "rgb(245, 124, 0)" },
                    height: "60px",
                    fontSize: "1.2rem",
                  }}
                >
                  Predict Category
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* Display Predicted Price */}
          {predictedPrice !== null && (
            <Box mt={4} textAlign="center">
              <Typography variant="h5">
                Your Predicted Price:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "AUD",
                }).format(predictedPrice)}
              </Typography>
            </Box>
          )}
          {/* Display a Line Chart for House Price Prediction */}
          {lineChartData && (
            <Box mt={4}>
              <Line
                ref={chartRef}
                data={lineChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Predicted House Prices by Bedroom Count",
                    },
                    zoom: {
                      pan: {
                        enabled: true, // Enable panning
                        mode: "xy", // Allow panning in both x and y directions
                      },
                      zoom: {
                        wheel: {
                          enabled: true,
                        },
                        pinch: {
                          enabled: true,
                        },
                        mode: "xy",
                      },
                    },
                  },
                  scales: {
                    x: {
                      type: "linear",
                      position: "bottom",
                      title: {
                        display: true,
                        text: "Bedrooms",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Predicted Price ($)",
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
          {/* Display Predicted Category */}
          {predictedCategory && (
            <Typography variant="h5" align="center" sx={{ mt: 2 }}>
              Your Predicted Category: {predictedCategory}
            </Typography>
          )}
          {/* Display Pie chart for category prediction */}
          {categoryChartData && (
            <Box mt={4}>
              <Pie
                data={categoryChartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "House Market Category Ratio",
                      fontSize: 100,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          // Access the label and value for the hovered slice
                          const label = context.label || "";
                          const value = context.raw || 0;
                          const percentage = (
                            (value /
                              context.dataset.data.reduce((a, b) => a + b, 0)) *
                            100
                          ).toFixed(2);
                          // Custom tooltip text
                          return `${label}: ${percentage}%`;
                        },
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PredictForm;
