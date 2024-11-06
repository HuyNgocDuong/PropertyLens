import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

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
    <>
      <Header />
      <Container
        sx={{
          bgcolor: "white",
          padding: '0',
          mx: "auto",
          margin: "0",
          width: "100vw",
          maxWidth: "100vw"
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
    </>
  );
};

export default App;
