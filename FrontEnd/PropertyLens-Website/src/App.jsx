import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import Theme from "./Theme"; // Make sure this path is correct

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
    </ThemeProvider>
  );
};

export default App;
