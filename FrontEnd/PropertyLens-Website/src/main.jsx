// src/index.js

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Import router
import { BrowserRouter as Router } from "react-router-dom";

// Import HouseContextProvider
import HouseContextProvider from "./components/HouseContext";

// Import MUI ThemeProvider and CssBaseline
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Theme.jsx"; // Ensure your theme file is named "theme.js"

// Render the application
createRoot(document.getElementById("root")).render(
  <HouseContextProvider>
    <Router>
      <ThemeProvider theme={theme}> {/* Corrected from Theme to theme */}
        <CssBaseline /> {/* CssBaseline for consistent styling reset */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </Router>
  </HouseContextProvider>
);
