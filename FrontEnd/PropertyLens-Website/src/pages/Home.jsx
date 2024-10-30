// import React from 'react';
import { Box } from "@mui/material";

// Import components
import Banner from "../components/Banner";
import HouseList from "../components/HouseList";

const Home = () => {
  return (
    <Box sx={{ minHeight: "1400px" }}>
      <Banner />
      <HouseList />
    </Box>
  );
};

export default Home;
