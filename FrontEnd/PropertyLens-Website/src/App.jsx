import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Theme from "./Theme";
import HouseContextProvider from "./components/HouseContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Predict from "./pages/Predict";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
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
            <Route path="/property/:houseId" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Container>
        <Footer />
      </HouseContextProvider>
    </ThemeProvider>
  );
};

export default App;
