// src/theme.js
import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: "#101828",
    },
    secondary: {
      main: "#7F56D9",
    },
  },
  spacing: 8,

  breakpoints: {
    values: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280, // Adjusted to match max-w of App component
    },
  },
  shadows: [
    "none",
    "0px 4px 20px rgba(0, 0, 0, 0.05)", // Reduced shadow intensity for a cleaner look
  ],
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "1rem",
          "@media (min-width: 1024px)": {
            padding: "1.5rem", // Adjusted padding to reduce whitespace on larger screens
            maxWidth: "100vw",
          },
        },
      },
    },
  },
});

export default Theme;
