import React from "react";
import { AppBar, Toolbar, Container, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";

// Import logo
import Logo from "../assets/img/PropertyLens-Logo.png";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "white",
  boxShadow: "none",
  borderBottom: "1px solid #e5e7eb",
});

const LogoLink = styled(RouterLink)({
  display: "flex",
  alignItems: "center",
});

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  "&.login": {
    color: "#7c3aed", // Violet-700
    "&:hover": {
      color: "#6d28d9", // Violet-800 on hover
    },
  },
  "&.signup": {
    backgroundColor: "#7c3aed", // Violet-700
    color: "white",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#6d28d9", // Violet-800
    },
  },
}));

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ py: 2, display: "flex", justifyContent: "space-between" }}
        >
          <LogoLink to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "auto", height: "60px" }}
            />
          </LogoLink>
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledButton className="signup" component={RouterLink} to="/about">
              About Us
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
