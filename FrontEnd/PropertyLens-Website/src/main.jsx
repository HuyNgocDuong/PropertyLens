import React from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App";

// Import router
import { BrowserRouter as Router } from "react-router-dom";

// Import house context provider
import HouseContextProvider from "./components/HouseContext";

// Import MUI ThemeProvider and CssBaseline
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./Theme.jsx";

createRoot(document.getElementById("root")).render(
  <HouseContextProvider>
    <Router>
      <ThemeProvider Theme={Theme}>
        <CssBaseline /> {/* CssBaseline for consistent styling reset */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </Router>
  </HouseContextProvider>
);
