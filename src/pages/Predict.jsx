import React, { useState } from "react";
import zoomPlugin from "chartjs-plugin-zoom"; // Import the zoom plugin
// Import for Line and Bar Chart from ChartJS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
import { styled } from "@mui/system";
import axios from "axios";

import { Line, Bar } from "react-chartjs-2";

// Button style to match website style
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  background: "linear-gradient(45deg, #6d28d9, #b389ff)",
  color: "#fff",
  fontWeight: 600,
  padding: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 14px rgba(109, 40, 217, 0.4)",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(109, 40, 217, 0.6)",
  },
}));

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  const [barChartData, setBarChartData] = useState(null); // Bar chart data
  const [averageData, setAverageData] = useState(null);
  const [errors, setErrors] = useState({});

  // Form Validation
  const validateForm = () => {
    // Error Message
    const newErrors = {};

    // Check for negative numbers
    const numericFields = [
      "Rooms",
      "Distance",
      "Postcode",
      "Bedroom2",
      "Bathroom",
    ];
    for (const field of numericFields) {
      if (formData[field] < 1) {
        newErrors[field] = `${field} cannot be less than 1.`; // Assign negative number error message for each field
      }
    }

    // Car and School Near by should be able to take value of 0
    if (formData.Car < 0) {
      newErrors.Car = `${formData.Car} cannot be less than 0.`;
    }
    if (formData.SchoolNearBy < 0) {
      newErrors.SchoolNearBy = `${formData.SchoolNearBy} cannot be less than 0.`;
    }
    // Set user input maximum limit
    if (formData.Rooms > 7) {
      newErrors.Rooms = "Can't enter value of room more than 7";
    }
    if (formData.Distance > 30) {
      newErrors.Distance = "Can't enter value of distance more than 30";
    }
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

  // Handle Prediction submit button
  const handleBothPrediction = async (e) => {
    e.preventDefault();
    // return if any input error occurs
    if (!validateForm()) return;
    try {
      // Predict Actual Price
      const priceResponse = await axios.post(
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
      const roundedPredictedPrice =
        Math.round(priceResponse.data.predicted_price * 100) / 100;
      setPredictedPrice(roundedPredictedPrice);

      // Prepare data for the Linechart
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
            label: "Your Price Prediction",
            data: [
              {
                x: parseInt(formData.Bedroom2),
                y: priceResponse.data.predicted_price,
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

      // Predict house price category
      const categoryResponse = await axios.post(
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
      setPredictedCategory(categoryResponse.data.predicted_category);
      const predictedCategory = categoryResponse.data.predicted_category;
      // Get average price
      const averagePriceResponse = await axios.post(
        "http://localhost:8000/category/average_price",
        {
          Price_Category: predictedCategory,
          Bedroom2: formData.Bedroom2,
          Price: roundedPredictedPrice,
        }
      );
      setAverageData(averagePriceResponse.data.average_price);
      console.log(averageData);
    } catch (error) {
      console.error("Error fetching predicted category:", error);
    }
  };
  // Handle show bar chart button
  const handleBarChart = async () => {
    let labels = []; // X axis
    let datasets = []; // Y axis
    averageData.forEach((item) => {
      // Add the Bedroom count to the labels array
      labels.push(item.Bedroom);
      // Add the Average_Price to the datasets array
      datasets.push(item.Average_Price);
    });
    const data = {
      labels: labels,
      datasets: [
        {
          // Actual Bar
          label: "Average Price by Bedroom",
          data: datasets,
          backgroundColor: ["rgb(75, 192, 192, 0.2)"],
          borderColor: ["rgb(75, 192, 192)"],
          borderWidth: 2.5,
        },
        {
          // Dot for user price
          label: "Your Price Prediction",
          data: [{ x: parseInt(formData.Bedroom2), y: predictedPrice }],
          backgroundColor: "rgba(130, 106, 251, 1)",
          borderColor: "rgba(88, 56, 250, 1)",
          borderWidth: 2,
          type: "scatter",
          showLine: false,
          pointRadius: 10,
          pointHoverRadius: 15,
        },
      ],
    };
    setBarChartData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Form for Prediction */}
      <Container
        maxWidth="md"
        sx={{
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 10,
            borderRadius: 8,
            p: 4,
            m: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              textAlign: { xs: "left", md: "center" },
            }}
          >
            Prediction Form
          </Typography>
          {/* Form */}
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
            </Grid>
          </Box>
          {/* Predict Button */}
          <StyledButton
            fullWidth
            onClick={handleBothPrediction}
            variant="contained"
            sx={{
              mt: 4,
              mb: 3,
              height: "60px",
              width: "60%",
              minWidth: "100px",
              fontSize: "1.2rem",
            }}
          >
            Predict
          </StyledButton>
          {predictedPrice !== null && (
            // Show Bar Chart button
            <StyledButton
              fullWidth
              onClick={handleBarChart}
              variant="contained"
              sx={{
                mb: 2,
                height: "60px",
                width: "60%",
                minWidth: "100px",
                fontSize: "1.2rem",
              }}
            >
              Insight
            </StyledButton>
          )}
          {/* Display Predicted Price */}
          {predictedPrice !== null && (
            <Box mt={4} textAlign="center">
              <Typography variant="h5">
                Your Predicted Price :{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "AUD",
                }).format(predictedPrice)}
              </Typography>
            </Box>
          )}
          {/* Display Predicted Category */}
          {predictedCategory && (
            <Typography variant="h5" align="center" sx={{ mt: 2 }}>
              Your Predicted Category : {predictedCategory}
            </Typography>
          )}
          {/* Display a Line Chart for House Price Prediction */}
          {lineChartData && (
            <Box
              mt={4}
              sx={{
                mt: 3,
                width: "80%",
                maxWidth: "800px",
                height: "50vh", // Fixed container height
                position: "relative", // Add this
              }}
            >
              <Line
                ref={chartRef}
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // Move this to options
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Predicted House Prices by Bedroom Count",
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          // Check if the dataset is the scatter point (predicted price)
                          if (tooltipItem.datasetIndex === 1) {
                            return `Your Price: $${tooltipItem.raw.y.toLocaleString()}`;
                          }
                          // Default tooltip for bar chart
                          return `Predicted Price by Bedroom: $${tooltipItem.raw.toLocaleString()}`;
                        },
                      },
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
                      min: 0,
                      ticks: {
                        stepSize: 1,
                        callback: function (value) {
                          if (Math.floor(value) === value) {
                            return value;
                          }
                        },
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
                style={{ height: "60vh" }}
              />
            </Box>
          )}
          {/* Display a Bar Chart for Average Price by Bedroom */}
          {barChartData && (
            <Box
              mt={4}
              sx={{ mt: 3, width: "80%", maxWidth: "800px", height: "400px" }}
            >
              <Bar
                maintainAspectRatio={false}
                height="100%"
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // Move this to options
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: `Average Price by Bedroom Count in ${predictedCategory} Category`, // Chart title
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          // Check if the dataset is the scatter point (predicted price)
                          if (tooltipItem.datasetIndex === 1) {
                            return `Your Price: $${tooltipItem.raw.y.toLocaleString()}`;
                          }
                          // Default tooltip for bar chart
                          return `Average Price by Bedroom: $${tooltipItem.raw.toLocaleString()}`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Bedrooms", // Label for the x-axis
                      },
                      min: 0,
                      ticks: {
                        stepSize: 1,
                        callback: function (value) {
                          if (Math.floor(value) === value) {
                            return value;
                          }
                        },
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Average Price ($)", // Label for the y-axis
                      },
                      beginAtZero: true, // Start y-axis at zero
                    },
                  },
                }}
                style={{ height: "60%" }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PredictForm;
