// import React from "react";
// Material UI imports
import { Box, Grid, Typography, Chip, Button } from "@mui/material";
import { green, grey } from "@mui/material/colors"; // Import default colors
// Import data
import { housesData } from "../Data";
// Import use params
import { useParams } from "react-router-dom";
// Import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";

// Custom violet colors to match Tailwind's violet shades
const violet = {
  500: "#7c3aed", // Tailwind's bg-violet-500
  600: "#6d28d9", // Tailwind's text-violet-600
  700: "#5b21b6", // Tailwind's bg-violet-700
  800: "#4c1d95", // Tailwind's hover:bg-violet-800
};

const PropertyDetails = () => {
  // Get the house id
  const { id } = useParams();
  // Get the house based on the id
  const house = housesData.find((house) => house.id === parseInt(id));

  return (
    <Box component="section" sx={{ minHeight: "800px", mb: 4 }}>
      <Box sx={{ maxWidth: "lg", mx: "auto", mb: 4 }}>
        {/* Top section */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="h4" fontWeight="bold">
              {house.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {house.address}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={house.type}
              sx={{ backgroundColor: green[500], color: "white", mr: 1 }}
            />
            <Chip
              label={house.country}
              sx={{ backgroundColor: violet[500], color: "white" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ color: violet[600] }}>
              ${house.price}
            </Typography>
          </Grid>
        </Grid>

        {/* Main content section */}
        <Grid container spacing={4}>
          {/* Left side: Image and details */}
          <Grid item xs={12}>
            <Box
              component="img"
              src={house.imageLg}
              alt={house.name}
              sx={{ width: "100%", mb: 2 }}
            />
            <Grid container spacing={2} sx={{ mb: 2, color: violet[600] }}>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <BiBed className="text-2xl" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {house.bedrooms} Bedrooms
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <BiBath className="text-2xl" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {house.bathrooms} Bathrooms
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <BiArea className="text-2xl" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {house.surface} sq ft
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography>{house.description}</Typography>
          </Grid>

          {/* Button for showing visual diagram */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: violet[700],
                  "&:hover": { backgroundColor: violet[800] },
                  color: "white",
                }}
              >
                Show Visual Diagram
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
