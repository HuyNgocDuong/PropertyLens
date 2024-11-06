<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> 915229c3c5092bcef1b1b8faedf3ef29a59f5d50
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import Theme from "./Theme"; // Make sure this path is correct

// Import context
import HouseContextProvider from "./components/HouseContext"; // Adjust path if needed

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Predict from "./pages/Predict";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
<<<<<<< HEAD
      <CssBaseline />
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "white",
          paddingY: 2,
          mx: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </Container>
      <Footer />
=======
      <HouseContextProvider>
        <CssBaseline />
        <Header />
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: "white",
            paddingY: 2,
            minWidth: "1400px",
            mx: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:houseId" element={<PropertyDetails />} /> {/* Updated path */}
            <Route path="/about" element={<About />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Container>
        <Footer />
      </HouseContextProvider>
>>>>>>> 915229c3c5092bcef1b1b8faedf3ef29a59f5d50
    </ThemeProvider>
  );
};

export default App;
